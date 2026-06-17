import { computed, unref } from 'vue'
import { useLocale } from '~/composables/useLocale'
import { MESSAGES } from '~/i18n/messages'

export function useI18n() {
  const { currentLocale } = useLocale()

  const t = (key: string, params?: Record<string, string | number>): string => {
    const loc = currentLocale.value
    const dict = MESSAGES[loc] ?? MESSAGES.en
    let str = dict[key] ?? MESSAGES.en[key] ?? key
    if (params) {
      for (const [k, v] of Object.entries(params)) {
        str = str.replace(new RegExp(`\\{${k}\\}`, 'g'), String(v))
      }
    }
    return str
  }

  return { t, locale: currentLocale }
}

export function useTr(key: string) {
  const { t } = useI18n()
  return computed(() => t(unref(key)))
}
