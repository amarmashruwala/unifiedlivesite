import { chromium } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';

// A portable, script-free review sheet of the actual rendered components.
const browser = await chromium.launch({ channel: process.env.PLAYWRIGHT_CHANNEL || 'chrome' });
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' });
  await page.goto(process.env.REVIEW_URL || 'http://127.0.0.1:4321/', { waitUntil: 'networkidle' });
  const sheet = await page.evaluate(() => {
    const css = [...document.styleSheets].flatMap(sheet => [...sheet.cssRules].map(rule => rule.cssText)).join('\n');
    const figures = ['live-journey', 'rooms', 'production', 'audience', 'workflow'].map(kind => document.querySelector(`[data-diagram="${kind}"]`).outerHTML);
    return `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>UnifiedLive — connected service diagrams</title><style>${css}\nbody{padding:32px}main{max-width:1100px;margin:auto}h1{font-size:36px;margin-bottom:48px}section{padding:32px;margin-bottom:48px;background:var(--ice)}section:first-of-type{background:var(--petrol);color:var(--paper)}@media(max-width:600px){body{padding:12px}section{padding:12px}}</style></head><body><main><h1>UnifiedLive — connected service diagrams</h1>${figures.map(figure => `<section>${figure}</section>`).join('')}</main></body></html>`;
  });
  await mkdir('artifacts', { recursive: true });
  await writeFile('artifacts/diagram-review.html', sheet);
} finally {
  await browser.close();
}
