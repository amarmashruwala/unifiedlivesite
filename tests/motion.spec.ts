import { test, expect } from '@playwright/test';

test.use({ viewport: { width: 1440, height: 1000 } });

test('journey advances, pauses globally, and remains stable during keyboard exploration', async ({ page }) => {
  await page.goto('/');
  const journey = page.locator('[data-live-journey]');
  await expect(journey).toHaveClass(/is-playing/);
  const initial = await journey.getAttribute('data-stage');
  await expect(journey).not.toHaveAttribute('data-stage', initial!, { timeout: 6000 });
  await journey.getByRole('button', { name: 'Pause motion' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-motion', 'paused');
  const paused = await journey.getAttribute('data-stage');
  await page.waitForTimeout(4100);
  await expect(journey).toHaveAttribute('data-stage', paused!);
  expect(await journey.locator('.diagram-wide .signal-packet').first().evaluate(el => getComputedStyle(el).animationPlayState)).toBe('paused');
  await journey.getByRole('button', { name: 'Play motion' }).click();
  const first = journey.getByRole('button', { name: 'Show Audiovisual', exact: true });
  await first.focus();
  await page.keyboard.press('End');
  await expect(journey.getByRole('button', { name: 'Show AI-powered audience engagement' })).toBeFocused();
  await expect(journey.locator('.journey-stage-link:visible')).toHaveAttribute('href', '/services#ai-automation');
  await page.keyboard.press('ArrowRight');
  await expect(first).toBeFocused();
  await expect(first).toHaveAttribute('aria-pressed', 'true');
  await page.waitForTimeout(4100);
  await expect(journey).toHaveAttribute('data-stage', '0');
  await expect(page.locator('main h1')).toHaveText('One Partner for the Entire AI-Powered Live Journey');
});

test('moving signals stop offscreen and reduced motion can change at runtime', async ({ page }) => {
  await page.goto('/');
  const journey = page.locator('[data-live-journey]');
  await expect(journey).toHaveClass(/is-playing/);
  const packet = journey.locator('.diagram-wide .signal-packet').first();
  const before = await packet.evaluate(el => getComputedStyle(el).offsetDistance);
  await expect.poll(() => packet.evaluate(el => getComputedStyle(el).offsetDistance)).not.toBe(before);
  await page.locator('.services-section').scrollIntoViewIfNeeded();
  await expect(journey).not.toHaveClass(/is-playing/);
  expect(await packet.evaluate(el => getComputedStyle(el).animationPlayState)).toBe('paused');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await journey.scrollIntoViewIfNeeded();
  await expect(page.locator('html')).toHaveAttribute('data-motion', 'reduced');
  await expect(journey.locator('[data-motion-toggle]')).toBeHidden();
  expect(await packet.evaluate(el => getComputedStyle(el).animationName)).toBe('none');
  await journey.getByRole('button', { name: 'Show Live production', exact: true }).click();
  await expect(journey.locator('.journey-stage-link:visible')).toHaveAttribute('href', '/services#live-production');
  await expect(journey).not.toHaveClass(/is-playing/);
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await expect(journey.locator('[data-motion-toggle]')).toBeVisible();
});

test('without JavaScript the complete workflow is visible with no inert playback controls', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 375, height: 900 } });
  const page = await context.newPage();
  await page.goto(baseURL!);
  await expect(page.locator('.journey-player')).toBeHidden();
  await expect(page.locator('[data-live-journey] [data-motion-toggle]')).toBeHidden();
  await expect(page.locator('.hero .diagram-narrow [data-node]')).toHaveCount(5);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  expect(await page.locator('.hero .signal-packet').first().evaluate(el => getComputedStyle(el).animationPlayState)).toBe('paused');
  await context.close();
});
