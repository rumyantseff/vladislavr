import { ref } from 'vue'

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

const currentLocale = ref<string>('en')

if (typeof window !== 'undefined') {
  const saved = window.localStorage.getItem(STORAGE_KEY)
  if (saved && LOCALES.some(l => l.code === saved)) currentLocale.value = saved
}

export const useLocale = () => ({
  currentLocale,
  locales: LOCALES,
  setLocale: (code: string) => {
    if (!LOCALES.some(l => l.code === code)) return
    currentLocale.value = code
    if (typeof window !== 'undefined') window.localStorage.setItem(STORAGE_KEY, code)
  },
})
