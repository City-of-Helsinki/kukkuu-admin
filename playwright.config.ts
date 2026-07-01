import * as fs from 'fs';

import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';

if (fs.existsSync('.env.test.local')) {
  dotenv.config({ path: '.env.test.local' });
}

const baseURL = process.env.BROWSER_TESTS_ENV_URL;

if (!baseURL) {
  throw new Error('BROWSER_TESTS_ENV_URL is required for Playwright runs.');
}

export default defineConfig({
  testDir: 'e2e',
  fullyParallel: false,
  workers: 1,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: [
    ['junit', { outputFile: 'report/e2e-junit-results.xml' }],
    ['html', { open: 'never', outputFolder: 'report/html' }],
  ],
  expect: { timeout: 15000 },
  use: {
    baseURL,
    ignoreHTTPSErrors: true,
    locale: 'fi-FI',
    viewport: { width: 1920, height: 1080 },
    trace: 'on-first-retry',
    screenshot: { mode: 'only-on-failure', fullPage: true },
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
