export interface LocaleEntry {
  code: string
  label: string
  flag: string
}

export const LOCALES: LocaleEntry[] = [
  { code: 'en', label: 'EN', flag: '/flags/en.svg' },
  { code: 'sk', label: 'SK', flag: '/flags/sk.svg' },
  { code: 'de', label: 'DE', flag: '/flags/de.svg' },
  { code: 'es', label: 'ES', flag: '/flags/es.svg' },
]

const STORAGE_KEY = 'vr-locale'

export const useLocale = () => {
  // useState is request-scoped on the server (no cross-request leakage between e.g. /sk and
  // /en) and shared as a singleton on the client. The initial value comes from the SSR-set
  // state; the URL (via the catch-all route) is the source of truth, so we do NOT seed from
  // localStorage here — that would fight the address the visitor actually requested.
  const currentLocale = useState<string>('locale', () => 'en')

  // `syncUrl` (default true): when the language actually changes, rewrite the URL to the
  // localized equivalent of the current page. The catch-all route adopts the locale FROM the
  // URL on load and passes syncUrl=false so it never fights the requested address.
  const setLocale = (code: string, syncUrl = true) => {
    if (!LOCALES.some(l => l.code === code)) return
    const changed = currentLocale.value !== code
    currentLocale.value = code
    if (typeof window === 'undefined') return
    window.localStorage.setItem(STORAGE_KEY, code)
    if (changed && syncUrl) rewriteUrlToLocale(code)
  }

  return { currentLocale, locales: LOCALES, setLocale }
}

// kept outside the factory so the dynamic import (which avoids a static cycle: routes.ts
// imports LOCALES from here) runs lazily, only when a real language switch happens.
function rewriteUrlToLocale(code: string) {
  import('~/i18n/routes').then(({ resolvePath, localizedPath }) => {
    const resolved = resolvePath(window.location.pathname)
    const target = localizedPath(resolved?.key ?? 'home', code)
    if (window.location.pathname !== target) {
      window.history.replaceState(window.history.state, '', target)
    }
  })
}
