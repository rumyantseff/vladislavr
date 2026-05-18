import { test, expect } from '@playwright/test'

test.describe('projects page', () => {
  test('project-card accordion expand on hover (desktop)', async ({ page, viewport }) => {
    test.skip((viewport?.width ?? 0) < 1024, 'desktop accordion only')

    await page.goto('/projects')
    await page.waitForTimeout(1200)

    const card0 = page.locator('[data-testid=project-card-0]:visible').first()
    const card1 = page.locator('[data-testid=project-card-1]:visible').first()
    await expect(card0).toBeVisible()

    const w0Before = (await card0.boundingBox())!.width
    const w1Before = (await card1.boundingBox())!.width
    expect(Math.abs(w0Before - w1Before)).toBeLessThan(10)

    await card0.hover()
    await page.waitForTimeout(600)

    const w0After = (await card0.boundingBox())!.width
    const w1After = (await card1.boundingBox())!.width
    expect(w0After).toBeGreaterThan(w0Before * 1.2)
    expect(w1After).toBeLessThan(w1Before * 0.9)
  })

  test('projects page renders project cards', async ({ page }) => {
    await page.goto('/projects')
    await page.waitForTimeout(1200)
    await expect(page.locator('[data-testid=project-card-0]:visible').first()).toBeVisible()
  })
})
