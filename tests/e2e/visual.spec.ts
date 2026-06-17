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
  // Wait for entry animations AND the scroll-driven card choreography to settle. On a fresh
  // load the scene's knot eases out (~2.4s) and the gated card entrances ride that out, so we
  // need a generous beat before the layout is truly static.
  const SETTLE_MS = 3_800

  // Two things never settle and so can't be part of a stable baseline:
  //  - the Three.js scene <canvas> (rotating knot + twinkling stars renders every frame)
  //  - the giant "HELLO" home watermark (its stroke eases in perpetually)
  // Hide both before snapshotting so Playwright's two-identical-frames check can stabilise;
  // the snapshot then asserts the deterministic DOM/layout around them.
  const HIDE_DYNAMIC = 'canvas, .hello-overlay { visibility: hidden !important; }'

  // Strip the WebGL canvases from the DOM entirely (not just visibility:hidden) so there's
  // zero GPU compositing churn left to destabilise the capture.
  const removeCanvases = (page: import('@playwright/test').Page) =>
    page.evaluate(() => document.querySelectorAll('canvas').forEach(c => c.remove()))

  test('home page snapshot', async ({ openHome, page }) => {
    await page.addStyleTag({ content: HIDE_DYNAMIC })
    await removeCanvases(page)
    await page.waitForTimeout(SETTLE_MS)
    await expect(page).toHaveScreenshot('home.png', {
      animations: 'disabled',
      caret: 'hide',
      maxDiffPixelRatio: 0.02,
      // the giant "HELLO" watermark eases in perpetually (never fully settles), like the marquees
      mask: [page.locator('.hello-overlay')],
      fullPage: false,
    })
  })

  test('about page snapshot', async ({ openAbout, page }) => {
    await page.addStyleTag({ content: HIDE_DYNAMIC })
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
    await page.addStyleTag({ content: HIDE_DYNAMIC })
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
    await page.addStyleTag({ content: HIDE_DYNAMIC })
    await page.waitForTimeout(SETTLE_MS)
    await expect(page).toHaveScreenshot('contact.png', {
      animations: 'disabled',
      caret: 'hide',
      maxDiffPixelRatio: 0.02,
      fullPage: false,
    })
  })
})
