import { test, expect } from '../fixtures'

test.describe('projects page', () => {
  test('project-card accordion expand on hover (desktop)', async ({ openProjects, viewport }) => {
    test.skip((viewport?.width ?? 0) < 1024, 'desktop accordion only')

    const card0 = openProjects.projectCard(0)
    const card1 = openProjects.projectCard(1)
    await expect(card0).toBeVisible()

    const w0Before = (await card0.boundingBox())!.width
    const w1Before = (await card1.boundingBox())!.width
    expect(Math.abs(w0Before - w1Before)).toBeLessThan(10)

    await card0.hover()

    await expect
      .poll(async () => (await card0.boundingBox())!.width, {
        message: 'hovered card should expand',
        timeout: 2_000,
      })
      .toBeGreaterThan(w0Before * 1.2)

    await expect
      .poll(async () => (await card1.boundingBox())!.width, {
        message: 'neighbor card should shrink',
        timeout: 2_000,
      })
      .toBeLessThan(w1Before * 0.9)
  })

  test('projects page renders project cards', async ({ openProjects }) => {
    await expect(openProjects.projectCard(0)).toBeVisible()
  })
})
