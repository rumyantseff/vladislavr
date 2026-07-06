import { LOCALES } from '~/composables/useLocale'

export type PageKey = 'home' | 'about' | 'projects' | 'contact' | 'send-message'

export const DEFAULT_LOCALE = 'en'

export const LOCALE_CODES = LOCALES.map(l => l.code)

export const ROUTE_SLUGS: Record<PageKey, Record<string, string>> = {
  home: { en: '', sk: '', de: '', es: '' },
  about: { en: 'about', sk: 'o-mne', de: 'ueber-mich', es: 'sobre-mi' },
  projects: { en: 'projects', sk: 'projekty', de: 'projekte', es: 'proyectos' },
  contact: { en: 'contact', sk: 'kontakt', de: 'kontakt', es: 'contacto' },
  'send-message': {
    en: 'send-message',
    sk: 'poslat-spravu',
    de: 'nachricht-senden',
    es: 'enviar-mensaje',
  },
}

const isLocale = (code: string): boolean => LOCALE_CODES.includes(code)

export const localizedPath = (key: PageKey, locale: string): string => {
  const loc = isLocale(locale) ? locale : DEFAULT_LOCALE
  const slug = ROUTE_SLUGS[key][loc] ?? ROUTE_SLUGS[key][DEFAULT_LOCALE]
  return slug ? `/${loc}/${slug}` : `/${loc}`
}

export interface ResolvedRoute {
  locale: string
  key: PageKey
}

export const resolvePath = (path: string): ResolvedRoute | null => {
  const parts = path.replace(/^\/+|\/+$/g, '').split('/').filter(Boolean)
  if (parts.length === 0) return null

  const locale = parts[0]!
  if (!isLocale(locale)) return null

  if (parts.length === 1) return { locale, key: 'home' }

  const slug = parts.slice(1).join('/')
  const key = (Object.keys(ROUTE_SLUGS) as PageKey[]).find(
    k => ROUTE_SLUGS[k][locale] === slug,
  )
  return key ? { locale, key } : null
}

export const allLocalizedPaths = (): string[] => {
  const keys = Object.keys(ROUTE_SLUGS) as PageKey[]
  return LOCALE_CODES.flatMap(loc => keys.map(k => localizedPath(k, loc)))
}
