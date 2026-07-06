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
  const currentLocale = useState<string>('locale', () => 'en')

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

function rewriteUrlToLocale(code: string) {
  import('~/i18n/routes').then(({ resolvePath, localizedPath }) => {
    const resolved = resolvePath(window.location.pathname)
    const target = localizedPath(resolved?.key ?? 'home', code)
    if (window.location.pathname !== target) {
      window.history.replaceState(window.history.state, '', target)
    }
  })
}
