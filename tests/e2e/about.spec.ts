import { test, expect } from '../fixtures'

test.describe('about page', () => {
  test('service-card grows on hover (desktop)', async ({ openAbout, viewport }) => {
    test.skip((viewport?.width ?? 0) < 1024, 'desktop hover only')

    const card = openAbout.serviceCard(0)
    await expect(card).toBeVisible()

    const initial = (await card.boundingBox())!
    await card.hover()

    await expect
      .poll(async () => (await card.boundingBox())!.height, {
        message: 'card should grow on hover',
        timeout: 2_000,
      })
      .toBeGreaterThan(initial.height * 1.05)
  })

  test('about page shows service cards', async ({ openAbout }) => {
    await expect(openAbout.serviceCard(0)).toBeVisible()
  })
})
