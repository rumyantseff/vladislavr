import { resolvePath, DEFAULT_LOCALE } from '~/i18n/routes'
import { useLocale } from '~/composables/useLocale'
import { PAGE_STACK_PAGES, usePageStack } from '~/composables/usePageStack'

// Adopt the locale AND active page index from the URL before the page/layout render, on every
// navigation (SSR + client). Doing it here (not in the page component) guarantees both are set
// before the layout's <Navigation> evaluates t() and the active-link state — so server-rendered
// text + active classes match the requested route (no hydration mismatch, no cross-request leak).
export default defineNuxtRouteMiddleware((to) => {
  const resolved = resolvePath(to.path)

  const { setLocale } = useLocale()
  // syncUrl=false: the URL is authoritative here; never rewrite it back.
  setLocale(resolved?.locale ?? DEFAULT_LOCALE, false)

  // align the page-stack's active index with the route (home for unknown/standalone pages)
  const { activeIndex } = usePageStack()
  const idx = resolved ? PAGE_STACK_PAGES.findIndex(p => p.key === resolved.key) : -1
  activeIndex.value = idx >= 0 ? idx : 0
})
