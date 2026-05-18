import { test, expect } from '@playwright/test'

test.describe('about page', () => {
  test('service-card grows on hover (desktop)', async ({ page, viewport }) => {
    test.skip((viewport?.width ?? 0) < 1024, 'desktop hover only')

    await page.goto('/about')
    await page.waitForTimeout(1200)

    // Filter by visible — there are two card sets in DOM (mobile carousel + desktop grid)
    const card = page.locator('[data-testid=service-card-0]:visible').first()
    await expect(card).toBeVisible()

    const initial = await card.boundingBox()
    expect(initial).not.toBeNull()

    await card.hover()
    await page.waitForTimeout(700)

    const hovered = await card.boundingBox()
    expect(hovered!.height).toBeGreaterThan(initial!.height * 1.05)
  })

  test('about page shows service cards', async ({ page }) => {
    await page.goto('/about')
    await page.waitForTimeout(1200)
    await expect(page.locator('[data-testid=service-card-0]:visible').first()).toBeVisible()
  })
})
