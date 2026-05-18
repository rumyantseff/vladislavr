import { test, expect } from '../fixtures'

const ROUTES = ['/', '/about', '/projects', '/contact'] as const

const IGNORED_ERROR_PATTERNS = /Hydration|@vite|sourcemap|@vueuse/i

for (const path of ROUTES) {
  test(`smoke: page ${path} loads without errors`, async ({ page, nav }) => {
    const errors: string[] = []
    page.on('pageerror', e => errors.push(e.message))
    page.on('console', m => {
      if (m.type() === 'error') errors.push(m.text())
    })

    await page.goto(path)
    await expect(nav.logo).toBeVisible()

    const fatal = errors.filter(e => !IGNORED_ERROR_PATTERNS.test(e))
    expect(fatal, `console errors on ${path}:\n${fatal.join('\n')}`).toEqual([])
  })
}
