import { test, expect } from '@playwright/test'

test.describe('navigation', () => {
  test.skip(({ viewport }) => (viewport?.width ?? 0) < 768, 'desktop nav only')

  test('clicking nav links scrolls to correct page and marks active', async ({ page }) => {
    await page.goto('/')
    await page.waitForTimeout(800)

    await page.locator('[data-testid=nav-link-about]').click()
    await page.waitForTimeout(1000)
    await expect(page).toHaveURL(/\/about$/)
    await expect(page.locator('[data-testid=nav-link-about]')).toHaveClass(/is-active/)

    await page.locator('[data-testid=nav-link-projects]').click()
    await page.waitForTimeout(1000)
    await expect(page).toHaveURL(/\/projects$/)
    await expect(page.locator('[data-testid=nav-link-projects]')).toHaveClass(/is-active/)

    await page.locator('[data-testid=nav-link-contact]').click()
    await page.waitForTimeout(1000)
    await expect(page).toHaveURL(/\/contact$/)
    await expect(page.locator('[data-testid=nav-link-contact]')).toHaveClass(/is-active/)
  })

  test('deep link loads correct page with active nav', async ({ page }) => {
    await page.goto('/projects')
    await page.waitForTimeout(800)
    await expect(page.locator('[data-testid=nav-link-projects]')).toHaveClass(/is-active/)
  })

  test('Hire Me CTA in nav is mailto', async ({ page }) => {
    await page.goto('/')
    await page.waitForTimeout(800)
    await expect(page.locator('[data-testid=nav-hire-me]')).toHaveAttribute('href', /^mailto:/)
  })
})
