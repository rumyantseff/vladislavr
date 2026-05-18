import { test, expect } from '@playwright/test'

test.describe('responsive layout', () => {
  test('mobile nav hides desktop links and shows hamburger', async ({ page, viewport }) => {
    test.skip((viewport?.width ?? 0) >= 768, 'mobile only')

    await page.goto('/')
    await page.waitForTimeout(800)

    await expect(page.locator('[data-testid=nav-link-about]')).toBeHidden()
    await expect(page.locator('[aria-label="Open menu"]')).toBeVisible()
  })

  test('desktop nav shows all link pills', async ({ page, viewport }) => {
    test.skip((viewport?.width ?? 0) < 768, 'desktop only')

    await page.goto('/')
    await page.waitForTimeout(800)

    for (const slug of ['home', 'about', 'projects', 'contact'] as const) {
      await expect(page.locator(`[data-testid=nav-link-${slug}]`)).toBeVisible()
    }
    await expect(page.locator('[aria-label="Open menu"]')).toBeHidden()
  })
})
