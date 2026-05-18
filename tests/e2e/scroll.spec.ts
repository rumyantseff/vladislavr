import { test, expect } from '@playwright/test'

test.describe('sticky-page scroll', () => {
  test.skip(({ viewport }) => (viewport?.width ?? 0) < 768, 'desktop only')

  test('scrolling main container transitions pages', async ({ page }) => {
    await page.goto('/')
    await page.waitForTimeout(1200)

    const scroller = page.locator('[data-page-stack-scroll]')
    await expect(page.locator('[data-testid=nav-link-home]')).toHaveClass(/is-active/)

    // Programmatic instant scroll (no smooth) to make assertion deterministic.
    await scroller.evaluate(el => {
      const e = el as HTMLElement
      e.scrollTop = e.clientHeight
      e.dispatchEvent(new Event('scroll'))
    })
    await page.waitForTimeout(500)
    await expect(page.locator('[data-testid=nav-link-about]')).toHaveClass(/is-active/)
    await expect(page).toHaveURL(/\/about$/)

    await scroller.evaluate(el => {
      const e = el as HTMLElement
      e.scrollTop = 0
      e.dispatchEvent(new Event('scroll'))
    })
    await page.waitForTimeout(500)
    await expect(page.locator('[data-testid=nav-link-home]')).toHaveClass(/is-active/)
    await expect(page).toHaveURL(/\/$/)
  })
})
