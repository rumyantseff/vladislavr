import type { Page, Locator } from '@playwright/test'
import { BasePage } from './BasePage'

export class ContactPage extends BasePage {
  constructor(page: Page) {
    super(page, '/contact', 'page-contact')
  }

  get cta(): Locator {
    return this.page.locator('[data-testid=contact-cta]')
  }

  get githubLink(): Locator {
    return this.page.locator('a[href*="github.com"]')
  }

  get linkedinLink(): Locator {
    return this.page.locator('a[href*="linkedin.com"]')
  }

  get headline(): Locator {
    return this.page.getByRole('heading', { name: /let's connect/i })
  }
}
