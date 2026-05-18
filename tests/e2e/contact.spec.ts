import { test, expect } from '../fixtures'

test.describe('contact page', () => {
  test('Hire Me Now! CTA has mailto link', async ({ openContact }) => {
    await expect(openContact.cta).toHaveAttribute('href', /^mailto:/)
  })

  test('social icons are present', async ({ openContact }) => {
    await expect(openContact.githubLink).toBeVisible()
    await expect(openContact.linkedinLink).toBeVisible()
  })

  test('contact page shows headline', async ({ openContact }) => {
    await expect(openContact.headline).toBeVisible()
  })
})
