import { test as base, expect } from '@playwright/test'
import {
  Navigation,
  PageStack,
  HomePage,
  AboutPage,
  ProjectsPage,
  ContactPage,
} from './pages'

/**
 * Shared test fixtures: Page Objects are instantiated once per test and injected
 * via destructuring. Use the `start*` variants when you want the fixture to
 * also navigate + wait for ready state (eliminates ~10 lines of boilerplate
 * from every spec).
 */
type Fixtures = {
  nav: Navigation
  stack: PageStack
  homePage: HomePage
  aboutPage: AboutPage
  projectsPage: ProjectsPage
  contactPage: ContactPage
  // Auto-loaded variants — already opened and waited-for
  openHome: HomePage
  openAbout: AboutPage
  openProjects: ProjectsPage
  openContact: ContactPage
}

export const test = base.extend<Fixtures>({
  nav: async ({ page }, use) => { await use(new Navigation(page)) },
  stack: async ({ page }, use) => { await use(new PageStack(page)) },
  homePage: async ({ page }, use) => { await use(new HomePage(page)) },
  aboutPage: async ({ page }, use) => { await use(new AboutPage(page)) },
  projectsPage: async ({ page }, use) => { await use(new ProjectsPage(page)) },
  contactPage: async ({ page }, use) => { await use(new ContactPage(page)) },

  openHome: async ({ homePage }, use) => {
    await homePage.goto()
    await use(homePage)
  },
  openAbout: async ({ aboutPage }, use) => {
    await aboutPage.goto()
    await use(aboutPage)
  },
  openProjects: async ({ projectsPage }, use) => {
    await projectsPage.goto()
    await use(projectsPage)
  },
  openContact: async ({ contactPage }, use) => {
    await contactPage.goto()
    await use(contactPage)
  },
})

export { expect }
