import type { Page, Locator } from '@playwright/test'
import { BasePage } from './BasePage'

export class ProjectsPage extends BasePage {
  constructor(page: Page) {
    super(page, '/projects', 'page-projects')
  }

  projectCard(index: number): Locator {
    return this.page.locator(`[data-testid=project-card-${index}]:visible`).first()
  }
}
