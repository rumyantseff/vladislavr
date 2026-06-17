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
}

export const SERVICE_AREAS: ServiceArea[] = [
  { value: 'devops', labelKey: 'about.devops.title', descKey: 'area.devops.desc', icon: ServerStack, iconBg: 'bg-indigo-500/15', iconColor: 'text-indigo-300' },
  { value: 'frontend', labelKey: 'about.frontend.title', descKey: 'area.frontend.desc', icon: CodeBracket, iconBg: 'bg-sky-500/15', iconColor: 'text-sky-300' },
  { value: 'qa', labelKey: 'about.qa.title', descKey: 'area.qa.desc', icon: ShieldCheck, iconBg: 'bg-emerald-500/15', iconColor: 'text-emerald-300' },
  { value: 'brand', labelKey: 'about.brand.title', descKey: 'area.brand.desc', icon: Swatch, iconBg: 'bg-orange-500/15', iconColor: 'text-orange-300' },
]

export const useServiceAreas = () => SERVICE_AREAS
