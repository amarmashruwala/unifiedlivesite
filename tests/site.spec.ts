import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { parse } from 'yaml';
import { content } from '../src/data/content';
import { routes } from '../src/data/routes';
import { rawMarkdown } from '../src/lib/markdown';

test('all routes, page metadata, and internal destinations resolve', async ({ page, request }) => {
 const destinations = new Set<string>();
 for (const route of routes) {
  const response = await page.goto(route.path);
  expect(response?.status()).toBe(200);
  await expect(page).toHaveTitle(route.title);
  expect(await page.locator('main h1').count()).toBeGreaterThan(0);
  for (const href of await page.locator('a[href^="/"]').evaluateAll(links => links.map(l => l.getAttribute('href')!))) destinations.add(href);
 }
 for (const href of destinations) {
  const url = new URL(href, 'http://127.0.0.1:4321');
  const response = await request.get(url.pathname);
  expect(response.status(), href).toBe(200);
  if (url.hash) expect(await response.text(), href).toContain(`id="${decodeURIComponent(url.hash.slice(1))}"`);
 }
});

test('AI Markdown is synchronized, parseable, and available as a static resource', async ({ page, request }) => {
 const raw = await (await request.get('/ai-agent-content.md')).text();
 expect(raw).toBe(rawMarkdown);
 const front = parse(raw.split('---\n')[1]);
 expect(front.services).toEqual(content.services.map(s => s.name));
 expect(front.industries).toEqual(content.industries.map(s => s.name));
 expect(front.locations).toEqual(['Sydney, Australia','Mumbai, India']);
 expect(front.last_updated).toBe(content.lastUpdated);
 expect(front.contact_method.status).toContain('Preview only');
 expect(raw).not.toMatch(/\bOBS\b/);
 const index = await (await request.get('/llms.txt')).text();
 for (const route of routes) expect(index).toContain(`](${route.path})`);
 await page.goto('/services');
 for (const service of content.services) for (const capability of service.capabilities) {
  await expect(page.getByText(capability, { exact: true }).first()).toBeVisible();
  expect(raw).toContain(capability);
 }
 await page.goto('/ai');
 for (const faq of content.faqs) await expect(page.getByText(faq.answer,{exact:true})).toBeVisible();
 await expect(page.locator('#raw-markdown')).toHaveValue(raw);
});

test('mode navigation, download and clipboard fallback', async ({ page }) => {
 await page.goto('/services');
 await page.locator('.view-switch').getByRole('link', { name: 'AI Agent View' }).click();
 await expect(page).toHaveURL(/\/ai$/);
 await expect(page.getByRole('link', { name: 'Download .md' })).toHaveAttribute('download','unifiedlive.md');
 await page.evaluate(() => Object.defineProperty(navigator, 'clipboard', { value: { writeText: () => Promise.reject(new Error('denied')) }, configurable: true }));
 await page.getByRole('button', { name: 'Copy Markdown' }).click();
 await expect(page.locator('#raw-details')).toHaveAttribute('open','');
 await expect(page.locator('#copy-status')).toContainText('Clipboard unavailable');
 await page.locator('.view-switch').getByRole('link', { name: 'Human View' }).click();
 expect(new URL(page.url()).pathname).toBe('/');
});

test('form validates without sending, persists no data, and supports preselection', async ({ page }) => {
 await page.goto('/contact?service=Partnership%20enquiry&industry=Education');
 await expect(page.locator('#service')).toHaveValue('Partnership enquiry');
 await expect(page.locator('#industry')).toHaveValue('Education');
 const outgoing: string[] = [];
 page.on('request', r => outgoing.push(r.url()));
 await page.getByRole('button', { name:'Validate enquiry' }).click();
 await expect(page.locator('#name')).toBeFocused();
 await expect(page.locator('#name')).toHaveAttribute('aria-invalid','true');
 await page.locator('#name').fill('Test Person');
 await page.locator('#email').fill('invalid');
 await page.locator('#details').fill('A hybrid education event connecting two venues.');
 await page.getByRole('button', { name:'Validate enquiry' }).click();
 await expect(page.locator('#email-error')).toContainText('valid email');
 await page.locator('#email').fill('preview@example.org');
 await page.locator('#preferred').selectOption('phone');
 await page.getByRole('button', { name:'Validate enquiry' }).click();
 await expect(page.locator('#phone')).toHaveAttribute('aria-invalid','true');
 await page.locator('#phone').fill('+61 400 000 000');
 await page.getByRole('button', { name:'Validate enquiry' }).click();
 await expect(page.locator('#form-status')).toContainText('has not been sent or stored');
 expect(outgoing).toEqual([]);
 expect(await page.evaluate(() => [localStorage.length,sessionStorage.length])).toEqual([0,0]);
 await page.locator('#preferred').selectOption('email');
 await page.locator('#phone').fill('');
 await page.getByRole('button', { name:'Validate enquiry' }).click();
 await expect(page.locator('#form-status')).toContainText('Your entries are valid');
});

for (const width of [375,390,768,1440]) {
 test(`responsive layout, mobile navigation, accessibility at ${width}px`, async ({ page }) => {
  await page.setViewportSize({ width, height: 1000 });
  for (const path of ['/','/services','/industries','/about','/global-presence','/partnerships','/contact','/faq','/ai','/404.html']) {
   await page.goto(path);
   expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), path).toBe(true);
   if (path !== '/') await page.screenshot({path:`artifacts/${path.slice(1).replace('.html','')}-${width}.png`,fullPage:true});
   const results = await new AxeBuilder({ page }).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
   expect(results.violations, `${path}: ${JSON.stringify(results.violations.map(v => ({ id:v.id,nodes:v.nodes.map(n=>n.target) })))}`).toEqual([]);
  }
  await page.goto('/');
  await page.screenshot({ path:`artifacts/home-${width}.png`, fullPage:true });
  if (width < 1000) {
   await page.locator('.mobile-nav summary').click();
   await expect(page.getByRole('navigation', { name:'Mobile primary' })).toBeVisible();
   await page.keyboard.press('Escape');
   await expect(page.locator('.mobile-nav')).not.toHaveAttribute('open','');
  }
 });
}

test('keyboard navigation, reduced motion, and form error accessibility', async ({ page }) => {
 await page.emulateMedia({ reducedMotion:'reduce' });
 await page.goto('/');
 await page.keyboard.press('Tab');
 await expect(page.getByRole('link', { name:'Skip to content' })).toBeFocused();
 await page.keyboard.press('Enter');
 await expect(page.locator('main')).toBeFocused();
 expect(await page.locator('.hero svg:visible .signal-dot').evaluate(el => getComputedStyle(el).animationName)).toBe('none');
 await page.goto('/contact');
 await page.getByRole('button', { name:'Validate enquiry' }).click();
 expect((await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze()).violations).toEqual([]);
 await page.screenshot({path:'artifacts/contact-errors.png',fullPage:true});
});

test('static content remains accessible without JavaScript and form cannot submit', async ({ browser, baseURL }) => {
 const context = await browser.newContext({javaScriptEnabled:false, baseURL});
 const page = await context.newPage();
 await page.goto('/ai');
 await expect(page.getByRole('heading',{name:'UnifiedLive',exact:true})).toBeVisible();
 await expect(page.getByRole('link',{name:'Download .md'})).toBeVisible();
 await page.goto('/contact');
 await expect(page.getByRole('button',{name:'Validate enquiry'})).toBeDisabled();
 expect(await page.locator('input[name],textarea[name],select[name]').count()).toBe(0);
 await context.close();
});
