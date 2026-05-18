import type { Page, Locator } from '@playwright/test'
import { expect } from '@playwright/test'

export type NavSlug = 'home' | 'about' | 'projects' | 'contact'

/**
 * The sticky navigation pill that appears on every page.
 * Exposes locators for each link, the Hire Me CTA, the logo and the hamburger.
 */
export class Navigation {
  constructor(private readonly page: Page) {}

  link(slug: NavSlug): Locator {
    return this.page.locator(`[data-testid=nav-link-${slug}]`)
  }

  get logo(): Locator {
    return this.page.locator('[data-testid=nav-logo]')
  }

  get hireMe(): Locator {
    return this.page.locator('[data-testid=nav-hire-me]')
  }

  get hamburger(): Locator {
    return this.page.locator('[aria-label="Open menu"]')
  }

  /**
   * Click a nav link and wait until the page-stack settles on the new slide.
   * The active class flips immediately after stack.scrollTo() runs.
   */
  async goTo(slug: NavSlug): Promise<void> {
    await this.link(slug).click()
    await expect(this.link(slug)).toHaveClass(/is-active/)
  }

  async expectActive(slug: NavSlug): Promise<void> {
    await expect(this.link(slug)).toHaveClass(/is-active/)
  }
}
