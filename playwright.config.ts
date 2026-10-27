import { defineConfig } from '@playwright/test';
const port = process.env.TEST_PORT || '4321';
const baseURL = `http://127.0.0.1:${port}`;
export default defineConfig({
  testDir: './tests', timeout: 60000, fullyParallel: true, workers: 3,
  use: { baseURL, headless: true, channel: process.env.PLAYWRIGHT_CHANNEL || undefined },
  webServer: { command: `npm run preview -- --port ${port} --ignore-lock`, url: baseURL, reuseExistingServer: !process.env.CI },
  reporter: [['list'], ['html', { open: 'never' }]],
});
