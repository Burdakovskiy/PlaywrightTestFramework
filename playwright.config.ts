import { defineConfig, devices } from '@playwright/test';
import { ConfigLoader } from './src/config/ConfigLoader';

const cfg = ConfigLoader.load();
/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  timeout: cfg.env.timeouts.test,
  expect: {
    timeout: cfg.env.timeouts.expect,
  },
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: cfg.run.forbidOnly ?? true,
  /* Retry on CI only */
  retries: cfg.run.retries ?? 1,
  /* Opt out of parallel tests on CI. */
  workers: cfg.run.workers ?? 2,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  grep: cfg.run.grep ? new RegExp(cfg.run.grep) : undefined,
  reporter: [['list'], ['html', { open: 'never', outputFolder: 'reports/html' }]],

  use: {
    baseURL: cfg.env.baseUrl,
    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://localhost:3000',
    headless: cfg.env.use?.headless ?? true,
    actionTimeout: cfg.env.timeouts.action,
    navigationTimeout: cfg.env.timeouts.navigation,
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: cfg.env.artifacts.trace,
    screenshot: cfg.env.artifacts.screenshot,
    video: cfg.env.artifacts.video,
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'ui',
      testDir: './tests/ui',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'api',
      testDir: './tests/api',
      use: {
        trace: 'off',
        screenshot: 'off',
        video: 'off',
      },
    },

    // {
    //   name: 'chromium',
    //   use: { ...devices['Desktop Chrome'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],

  outputDir: 'artifacts/test-output',
  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
