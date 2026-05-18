import { test, expect } from '../fixtures'

/**
 * Visual regression suite — snapshots are stored next to this spec file in
 * `__snapshots__/visual.spec.ts-snapshots/`.
 *
 * Update baselines deliberately:
 *   yarn test:e2e visual --update-snapshots
 *
 * Tolerance: `maxDiffPixelRatio: 0.02` (2 %) absorbs sub-pixel font/render noise
 * across browsers without hiding real layout regressions.
 */
test.describe('visual regression', () => {
  // Wait an extra beat for entry animations to settle before grabbing pixels.
  const SETTLE_MS = 1_200

  test('home page snapshot', async ({ openHome, page }) => {
    await page.waitForTimeout(SETTLE_MS)
    await expect(page).toHaveScreenshot('home.png', {
      animations: 'disabled',
      caret: 'hide',
      maxDiffPixelRatio: 0.02,
      fullPage: false,
    })
  })

  test('about page snapshot', async ({ openAbout, page }) => {
    await page.waitForTimeout(SETTLE_MS)
    await expect(page).toHaveScreenshot('about.png', {
      animations: 'disabled',
      caret: 'hide',
      maxDiffPixelRatio: 0.02,
      mask: [page.locator('[data-testid^=marquee], [class*=marquee]')], // marquee strips never settle
      fullPage: false,
    })
  })

  test('projects page snapshot', async ({ openProjects, page }) => {
    await page.waitForTimeout(SETTLE_MS)
    await expect(page).toHaveScreenshot('projects.png', {
      animations: 'disabled',
      caret: 'hide',
      maxDiffPixelRatio: 0.02,
      mask: [page.locator('[class*=marquee]')],
      fullPage: false,
    })
  })

  test('contact page snapshot', async ({ openContact, page }) => {
    await page.waitForTimeout(SETTLE_MS)
    await expect(page).toHaveScreenshot('contact.png', {
      animations: 'disabled',
      caret: 'hide',
      maxDiffPixelRatio: 0.02,
      fullPage: false,
    })
  })
})
