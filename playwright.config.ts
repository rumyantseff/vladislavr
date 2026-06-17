import { defineConfig, devices } from '@playwright/test'

// On CI we use the bundled Playwright Chromium (Docker image has it preinstalled).
// Locally on Ubuntu 26.04 the bundle is unsupported, so we fall back to the
// system Chrome via `channel: 'chrome'`.
const useChromeChannel = !process.env.CI

export default defineConfig({
  testDir: './tests/e2e',
  timeout: 30_000,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['html', { open: 'never' }], ['list']],
  // Visual regression: one baseline per project (chrome-desktop / mobile-chrome),
  // stored next to the spec to keep PR diffs reviewable.
  snapshotPathTemplate: '{testDir}/__snapshots__/{testFilePath}/{arg}-{projectName}{ext}',
  expect: {
    // Generous timeout: generating/matching a baseline waits for two stable consecutive
    // frames, and the scroll-driven card choreography can take a few seconds to fully settle.
    timeout: 15_000,
    toHaveScreenshot: {
      maxDiffPixelRatio: 0.02,
      animations: 'disabled',
      caret: 'hide',
    },
  },
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  webServer: {
    command: 'yarn dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
  projects: [
    {
      name: 'chrome-desktop',
      use: {
        ...devices['Desktop Chrome'],
        ...(useChromeChannel ? { channel: 'chrome' } : {}),
        viewport: { width: 1440, height: 900 },
      },
    },
    {
      name: 'mobile-chrome',
      use: {
        ...devices['Pixel 5'],
        ...(useChromeChannel ? { channel: 'chrome' } : {}),
      },
    },
  ],
})
