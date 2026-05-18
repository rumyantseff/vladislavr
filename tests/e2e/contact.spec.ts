import { test, expect } from '@playwright/test'

test.describe('contact page', () => {
  test('Hire Me Now! CTA has mailto link', async ({ page }) => {
    await page.goto('/contact')
    await page.waitForTimeout(800)
    await expect(page.locator('[data-testid=contact-cta]')).toHaveAttribute('href', /^mailto:/)
  })

  test('social icons are present', async ({ page }) => {
    await page.goto('/contact')
    await page.waitForTimeout(800)
    await expect(page.locator('a[href*="github.com"]')).toBeVisible()
    await expect(page.locator('a[href*="linkedin.com"]')).toBeVisible()
  })

  test('contact page shows headline', async ({ page }) => {
    await page.goto('/contact')
    await page.waitForTimeout(800)
    await expect(page.getByRole('heading', { name: /let's connect/i })).toBeVisible()
  })
})
