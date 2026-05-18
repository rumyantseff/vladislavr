import type { Page, Locator } from '@playwright/test'
import { BasePage } from './BasePage'

export class AboutPage extends BasePage {
  constructor(page: Page) {
    super(page, '/about', 'page-about')
  }

  /**
   * Returns the visible service card for a given index. On mobile there is
   * a carousel and on desktop a bento grid — both render the same testid,
   * so we filter by `:visible` to grab the active one.
   */
  serviceCard(index: number): Locator {
    return this.page.locator(`[data-testid=service-card-${index}]:visible`).first()
  }
}
