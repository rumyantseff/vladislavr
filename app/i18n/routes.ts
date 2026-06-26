// Single source of truth for localized URLs.
//
// Every page is identified by a stable `PageKey`; each key maps to a localized slug per locale.
// URLs are always prefixed with the locale and the translated slug, e.g.
//   home  -> /en, /sk, /de, /es
//   about -> /en/about, /sk/o-mne, /de/ueber-mich, /es/sobre-mi
//
// The page-stack, links, the language switcher and the catch-all route all build/parse paths
// through the helpers here, so adding a page or fixing a slug happens in exactly one place.

import { LOCALES } from '~/composables/useLocale'

export type PageKey = 'home' | 'about' | 'projects' | 'contact' | 'send-message'

export const DEFAULT_LOCALE = 'en'

export const LOCALE_CODES = LOCALES.map(l => l.code)

// slug per page per locale. Home has an empty slug (the locale prefix alone is its URL).
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

/** Build a localized path, e.g. localizedPath('about', 'sk') -> '/sk/o-mne'. */
export const localizedPath = (key: PageKey, locale: string): string => {
  const loc = isLocale(locale) ? locale : DEFAULT_LOCALE
  const slug = ROUTE_SLUGS[key][loc] ?? ROUTE_SLUGS[key][DEFAULT_LOCALE]
  return slug ? `/${loc}/${slug}` : `/${loc}`
}

export interface ResolvedRoute {
  locale: string
  key: PageKey
}

/**
 * Parse an incoming path into a locale + page key. Returns null when the path is not a known
 * localized route (so callers can fall back / redirect). The bare path segments are matched
 * against the slug table for the path's locale.
 */
export const resolvePath = (path: string): ResolvedRoute | null => {
  const parts = path.replace(/^\/+|\/+$/g, '').split('/').filter(Boolean)
  if (parts.length === 0) return null

  const locale = parts[0]!
  if (!isLocale(locale)) return null

  // /<locale>  -> home
  if (parts.length === 1) return { locale, key: 'home' }

  const slug = parts.slice(1).join('/')
  const key = (Object.keys(ROUTE_SLUGS) as PageKey[]).find(
    k => ROUTE_SLUGS[k][locale] === slug,
  )
  return key ? { locale, key } : null
}

/** All localized paths for every page × locale — used for SSG prerendering. */
export const allLocalizedPaths = (): string[] => {
  const keys = Object.keys(ROUTE_SLUGS) as PageKey[]
  return LOCALE_CODES.flatMap(loc => keys.map(k => localizedPath(k, loc)))
}
