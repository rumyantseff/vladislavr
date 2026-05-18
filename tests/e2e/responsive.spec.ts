import { test, expect } from '../fixtures'

test.describe('responsive layout', () => {
  test('mobile nav hides desktop links and shows hamburger', async ({ openHome, nav, viewport }) => {
    test.skip((viewport?.width ?? 0) >= 768, 'mobile only')

    await expect(nav.link('about')).toBeHidden()
    await expect(nav.hamburger).toBeVisible()
  })

  test('desktop nav shows all link pills', async ({ openHome, nav, viewport }) => {
    test.skip((viewport?.width ?? 0) < 768, 'desktop only')

    for (const slug of ['home', 'about', 'projects', 'contact'] as const) {
      await expect(nav.link(slug)).toBeVisible()
    }
    await expect(nav.hamburger).toBeHidden()
  })
})
