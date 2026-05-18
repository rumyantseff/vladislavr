import { test, expect } from '@playwright/test'

const ROUTES = ['/', '/about', '/projects', '/contact'] as const

for (const path of ROUTES) {
  test(`smoke: page ${path} loads without errors`, async ({ page }) => {
    const errors: string[] = []
    page.on('pageerror', e => errors.push(e.message))
    page.on('console', m => {
      if (m.type() === 'error') errors.push(m.text())
    })

    await page.goto(path)
    await expect(page.locator('[data-testid=nav-logo]')).toBeVisible()
    await page.waitForTimeout(800)

    // Ignore expected hydration warnings or vite dev errors which we can't influence
    const fatalErrors = errors.filter(
      e => !/Hydration|@vite|sourcemap|@vueuse/i.test(e),
    )
    expect(fatalErrors, `console errors on ${path}: ${fatalErrors.join('\n')}`).toEqual([])
  })
}
