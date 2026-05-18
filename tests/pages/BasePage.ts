import type { Page, Locator } from '@playwright/test'

/**
 * Shared base for every page object. Encapsulates `goto` + "page is ready" wait.
 */
export abstract class BasePage {
  protected constructor(
    protected readonly page: Page,
    protected readonly path: string,
    protected readonly testId: string,
  ) {}

  /**
   * Navigate to this page and wait until skeleton is gone + entry animations
   * have started (page wrapper with data-testid is mounted and visible).
   */
  async goto(): Promise<void> {
    await this.page.goto(this.path)
    await this.waitForReady()
  }

  /**
   * Wait until the real page wrapper (not skeleton) is in DOM and visible.
   * Replaces the brittle `waitForTimeout(700)` pattern.
   */
  async waitForReady(): Promise<void> {
    await this.page.locator(`[data-testid=${this.testId}]`).waitFor({ state: 'visible' })
  }

  get root(): Locator {
    return this.page.locator(`[data-testid=${this.testId}]`)
  }
}
