import { computed, type ComputedRef } from 'vue'
import { resolvePath, type PageKey } from '~/i18n/routes'

export const SITE_NAME = 'Vlad Rumyantsev'

export interface PageStackEntry {
  key: PageKey
  text: string
}

export const PAGE_STACK_PAGES: PageStackEntry[] = [
  { key: 'home', text: 'Home' },
  { key: 'about', text: 'About' },
  { key: 'projects', text: 'Projects' },
  { key: 'contact', text: 'Contact' },
]

export const indexForPath = (path: string): number => {
  const resolved = resolvePath(path)
  if (!resolved) return 0
  const i = PAGE_STACK_PAGES.findIndex(p => p.key === resolved.key)
  return i >= 0 ? i : 0
}

const useActiveIndex = () => useState<number>('pageActiveIndex', () => 0)
const useScrollProgress = () => useState<number>('pageScrollProgress', () => 0)
const useKnotVisible = () => useState<number>('pageKnotVisible', () => 1)

let scrollToFn: ((index: number) => void) | null = null

const easeInOutCubic = (x: number): number =>
  x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2

const clamp01 = (x: number): number => Math.min(1, Math.max(0, x))

const HANDOFF = 0.5

export const usePageVisibility = (index: number): ComputedRef<number> => {
  const scrollProgress = useScrollProgress()
  return computed(() => easeInOutCubic(clamp01(1 - Math.abs(scrollProgress.value - index) / HANDOFF)))
}

const KNOT_GONE = 0.02

export const usePageReveal = (index: number): ComputedRef<number> => {
  const scrollProgress = useScrollProgress()
  const knotVisible = useKnotVisible()
  return computed(() => {
    const visible = clamp01(1 - Math.abs(scrollProgress.value - index) / HANDOFF)
    if (index !== 1) return easeInOutCubic(visible)
    if (typeof window !== 'undefined' && window.innerWidth < 1024) return easeInOutCubic(visible)
    const gate = clamp01((KNOT_GONE - knotVisible.value) / KNOT_GONE)
    return easeInOutCubic(visible * gate)
  })
}

export const usePageStack = () => ({
  activeIndex: useActiveIndex(),
  scrollProgress: useScrollProgress(),
  knotVisible: useKnotVisible(),
  scrollTo: (index: number): boolean => {
    if (!scrollToFn) return false
    scrollToFn(index)
    return true
  },
  registerScrollTo: (fn: (index: number) => void) => { scrollToFn = fn },
  unregisterScrollTo: () => { scrollToFn = null },
})
