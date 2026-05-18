import type { Page, Locator } from '@playwright/test'
import { expect } from '@playwright/test'

/**
 * Wrapper around the scrolling container that owns the sticky slides.
 * Exposes helpers for programmatic scroll between slides plus assertions
 * that wait for reactivity to flush.
 */
export class PageStack {
  constructor(private readonly page: Page) {}

  get scroller(): Locator {
    return this.page.locator('[data-page-stack-scroll]')
  }

  /**
   * Synchronously set scroll position to a specific slide index and dispatch
   * the scroll event so the page-stack onScroll handler runs immediately.
   * Resolves once the URL reflects the target path (= reactive update flushed).
   */
  async scrollToSlide(index: number, expectedPath: string): Promise<void> {
    await this.scroller.evaluate((el, i) => {
      const e = el as HTMLElement
      e.scrollTop = e.clientHeight * i
      e.dispatchEvent(new Event('scroll'))
    }, index)
    await this.page.waitForURL(url => url.pathname === expectedPath)
  }

  /**
   * Poll the active index until it equals `expected`. Bridges Vue reactivity
   * with deterministic assertions in tests.
   */
  async expectActiveIndex(expected: number): Promise<void> {
    await expect
      .poll(async () => {
        return this.page.evaluate(() => {
          const links = Array.from(
            document.querySelectorAll('[data-testid^=nav-link-]'),
          )
          return links.findIndex(l => l.classList.contains('is-active'))
        })
      }, { message: `nav active index should become ${expected}`, timeout: 2_000 })
      .toBe(expected)
  }
}
