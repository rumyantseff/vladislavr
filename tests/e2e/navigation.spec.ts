import { test, expect } from '../fixtures'

test.describe('navigation', () => {
  test.skip(({ viewport }) => (viewport?.width ?? 0) < 768, 'desktop nav only')

  test('clicking nav links scrolls to correct page and marks active', async ({ openHome, nav, page }) => {
    await nav.goTo('about')
    await expect(page).toHaveURL(/\/about$/)

    await nav.goTo('projects')
    await expect(page).toHaveURL(/\/projects$/)

    await nav.goTo('contact')
    await expect(page).toHaveURL(/\/contact$/)
  })

  test('deep link loads correct page with active nav', async ({ openProjects, nav }) => {
    await nav.expectActive('projects')
  })

  test('Hire Me CTA in nav is mailto', async ({ openHome, nav }) => {
    await expect(nav.hireMe).toHaveAttribute('href', /^mailto:/)
  })
})
