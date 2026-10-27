import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { content } from '../src/data/content';

test('explorer keyboard navigation, service links, contact preselection, and privacy', async ({ page }) => {
  await page.goto('/');
  const tabs = page.getByRole('tablist', { name: 'Example configurations' });
  const meeting = tabs.getByRole('tab', { name: 'Meeting room' });
  await expect(meeting).toHaveAttribute('aria-selected', 'true');
  await meeting.focus();
  const outgoing: string[] = [];
  page.on('request', request => outgoing.push(request.url()));
  await page.keyboard.press('ArrowLeft');
  await expect(tabs.getByRole('tab', { name: 'Creator setup' })).toBeFocused();
  await page.keyboard.press('Home');
  await expect(meeting).toBeFocused();
  await page.keyboard.press('ArrowRight');
  await expect(tabs.getByRole('tab', { name: 'Hybrid event' })).toBeFocused();
  await page.keyboard.press('End');
  await expect(page.getByRole('tabpanel', { name: 'Creator setup' })).toBeVisible();
  expect(outgoing).toEqual([]);
  expect(await page.evaluate(() => [localStorage.length, sessionStorage.length])).toEqual([0, 0]);
  for (const scenario of content.scenarios) {
    await tabs.getByRole('tab', { name: scenario.title }).click();
    const panel = page.getByRole('tabpanel', { name: scenario.title });
    await expect(page.getByRole('tabpanel')).toHaveCount(1);
    await expect(panel).toContainText(scenario.summary);
    for (const id of scenario.serviceIds) {
      const service = content.services.find(service => service.id === id)!;
      await expect(panel.getByRole('link', { name: service.name, exact: true })).toHaveAttribute('href', `/services#${id}`);
    }
    expect((await new AxeBuilder({ page }).include('#scenarios').withTags(['wcag2a','wcag2aa','wcag21aa']).analyze()).violations).toEqual([]);
    await panel.getByRole('link', { name: 'Explore this enquiry' }).click();
    await expect(page.locator('#service')).toHaveValue(scenario.contactInterest);
    await page.goto('/');
  }
});

test('all example configurations survive without JavaScript and match AI Markdown', async ({ browser, baseURL, request }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, baseURL });
  const page = await context.newPage();
  await page.goto('/');
  await expect(page.getByRole('tablist')).toHaveCount(0);
  const raw = await (await request.get('/ai-agent-content.md')).text();
  for (const scenario of content.scenarios) {
    const panel = page.locator(`#scenario-${scenario.id}`);
    await expect(panel).toBeVisible();
    await expect(panel.getByRole('heading', { name: scenario.title })).toBeVisible();
    await expect(panel).toContainText(scenario.summary);
    expect(raw).toContain(`### ${scenario.title}`);
    expect(raw).toContain(scenario.summary);
    for (const id of scenario.serviceIds) expect(raw).toContain(`/services#${id}`);
    const target = `/contact?service=${encodeURIComponent(scenario.contactInterest)}`;
    await expect(panel.getByRole('link', { name: 'Explore this enquiry' })).toHaveAttribute('href', target);
    expect(raw).toContain(target);
  }
  await context.close();
});
