import { test, expect } from '@playwright/test';
import { content } from '../src/data/content';

test('diagram explanations and relationships are included in the AI resource', async ({ request }) => {
  const markdown = await (await request.get('/ai-agent-content.md')).text();
  for (const diagram of Object.values(content.diagrams)) {
    expect(markdown).toContain(diagram.title);
    expect(markdown).toContain(diagram.summary);
    for (const node of diagram.nodes) expect(markdown).toContain(node.title.join(' '));
    for (const edge of diagram.connections) expect(markdown).toContain(edge.label);
  }
});

for (const width of [375, 390, 768, 1440]) {
  test(`diagrams retain readable labels, accessible names and complete topology at ${width}px without JS`, async ({ browser, baseURL }) => {
    const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width, height: 1000 }, reducedMotion: 'reduce' });
    const page = await context.newPage();
    for (const route of ['/', '/services', '/about']) {
      await page.goto(`${baseURL}${route}`);
      const ids = await page.locator('[id]').evaluateAll(elements => elements.map(el => el.id));
      expect(new Set(ids).size).toBe(ids.length);
      for (const figure of await page.locator('[data-diagram]').all()) {
        const kind = await figure.getAttribute('data-diagram') as keyof typeof content.diagrams;
        const model = content.diagrams[kind];
        const svg = figure.locator('svg:visible');
        await expect(svg).toHaveCount(1);
        await expect(svg).toHaveAccessibleName(new RegExp(model.title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
        expect(await svg.locator('[data-node]').count()).toBe(model.nodes.length);
        expect(await svg.locator('.diagram-connector').count()).toBe(model.connections.length);
        const errors = await svg.evaluate(root => {
          const problems: string[] = [];
          for (const node of root.querySelectorAll<SVGGElement>('[data-node]')) {
            const box = node.querySelector<SVGRectElement>('rect:not(.diagram-store-back)')!.getBoundingClientRect();
            for (const text of node.querySelectorAll<SVGTextElement>('text')) {
              const bounds = text.getBoundingClientRect();
              if (bounds.left < box.left + 3 || bounds.right > box.right - 3 || bounds.top < box.top + 3 || bounds.bottom > box.bottom - 3) problems.push(`Clipped label: ${text.textContent}`);
              const scale = text.getScreenCTM()!.a;
              if (parseFloat(getComputedStyle(text).fontSize) * scale < 12) problems.push(`Small label: ${text.textContent}`);
            }
          }
          return problems;
        });
        expect(errors, `${route}: ${kind}`).toEqual([]);
      }
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      await page.screenshot({ path: `artifacts/diagrams-${route === '/' ? 'home' : route.slice(1)}-${width}.png`, fullPage: true });
    }
    await context.close();
  });
}
