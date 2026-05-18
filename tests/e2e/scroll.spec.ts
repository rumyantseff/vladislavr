import { test, expect } from '../fixtures'

test.describe('sticky-page scroll', () => {
  test.skip(({ viewport }) => (viewport?.width ?? 0) < 768, 'desktop only')

  test('scrolling main container transitions pages', async ({ openHome, nav, stack, page }) => {
    await nav.expectActive('home')

    await stack.scrollToSlide(1, '/about')
    await nav.expectActive('about')
    await expect(page).toHaveURL(/\/about$/)

    await stack.scrollToSlide(0, '/')
    await nav.expectActive('home')
    await expect(page).toHaveURL(/\/$/)
  })
})
