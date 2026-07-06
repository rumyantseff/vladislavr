import { resolvePath, DEFAULT_LOCALE } from '~/i18n/routes'
import { useLocale } from '~/composables/useLocale'
import { PAGE_STACK_PAGES, usePageStack } from '~/composables/usePageStack'

export default defineNuxtRouteMiddleware((to) => {
  const resolved = resolvePath(to.path)

  const { setLocale } = useLocale()
  setLocale(resolved?.locale ?? DEFAULT_LOCALE, false)

  const { activeIndex } = usePageStack()
  const idx = resolved ? PAGE_STACK_PAGES.findIndex(p => p.key === resolved.key) : -1
  activeIndex.value = idx >= 0 ? idx : 0
})
