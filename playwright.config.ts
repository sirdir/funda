import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({
  testDir: './tests',
  reporter: 'html',
  retries: 3,
  use: {
    viewport: {
      width: 1920,
      height: 1080,
    },
    testIdAttribute: 'data-test-id',
    baseURL: 'https://www.funda.nl',
    trace: 'on-first-retry',
    userAgent: process.env.USER_AGENT,
  },

  projects: [
    {
      name: 'cookies',
      testMatch: '**/*.setup.ts',
    },
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'playwright/.auth/user.json',
        userAgent: process.env.USER_AGENT,
        viewport: {
          width: 1920,
          height: 1080,
        },
      },
      dependencies: ['cookies'],
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        storageState: 'playwright/.auth/user.json',
        userAgent: process.env.USER_AGENT,
        viewport: {
          width: 1920,
          height: 1080,
        },
      },
      dependencies: ['cookies'],
    },
  ],
});
