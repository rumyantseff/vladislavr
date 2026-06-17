import { en } from '~/i18n/locales/en'
import { sk } from '~/i18n/locales/sk'
import { de } from '~/i18n/locales/de'
import { es } from '~/i18n/locales/es'

export type Messages = Record<string, string>

export const MESSAGES: Record<string, Messages> = { en, sk, de, es }
