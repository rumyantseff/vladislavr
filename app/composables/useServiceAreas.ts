import ServerStack from '~/components/shared/icons/server-stack.vue'
import CodeBracket from '~/components/shared/icons/code-bracket.vue'
import ShieldCheck from '~/components/shared/icons/shield-check.vue'
import Swatch from '~/components/shared/icons/swatch.vue'

export interface ServiceArea {
  value: string
  labelKey: string
  descKey: string
  icon: unknown
  iconBg: string
  iconColor: string
  // false => not bookable yet: the service card shows a "Coming soon" disabled state and the
  // form dropdown renders the option as disabled. Single source of truth for both.
  available: boolean
}

export const SERVICE_AREAS: ServiceArea[] = [
  { value: 'devops', labelKey: 'about.devops.title', descKey: 'area.devops.desc', icon: ServerStack, iconBg: 'bg-indigo-500/15', iconColor: 'text-indigo-300', available: false },
  { value: 'frontend', labelKey: 'about.frontend.title', descKey: 'area.frontend.desc', icon: CodeBracket, iconBg: 'bg-sky-500/15', iconColor: 'text-sky-300', available: true },
  { value: 'qa', labelKey: 'about.qa.title', descKey: 'area.qa.desc', icon: ShieldCheck, iconBg: 'bg-emerald-500/15', iconColor: 'text-emerald-300', available: true },
  { value: 'brand', labelKey: 'about.brand.title', descKey: 'area.brand.desc', icon: Swatch, iconBg: 'bg-orange-500/15', iconColor: 'text-orange-300', available: true },
]

/** Quick lookup: is a given service area currently bookable? Unknown areas default to true. */
export const isAreaAvailable = (value: string): boolean =>
  SERVICE_AREAS.find(a => a.value === value)?.available ?? true

export const useServiceAreas = () => SERVICE_AREAS
