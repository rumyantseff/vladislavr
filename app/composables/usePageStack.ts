import { ref, computed, type ComputedRef } from 'vue'

export const SITE_NAME = 'Vlad Rumyantsev'

export interface PageStackEntry {
  path: string
  text: string
}

export const PAGE_STACK_PAGES: PageStackEntry[] = [
  { path: '/', text: 'Home' },
  { path: '/about', text: 'About' },
  { path: '/projects', text: 'Projects' },
  { path: '/contact', text: 'Contact' },
]

export const indexForPath = (path: string): number => {
  const i = PAGE_STACK_PAGES.findIndex(p => p.path === path)
  return i >= 0 ? i : 0
}

const activeIndex = ref(0)

const scrollProgress = ref(0)

const knotVisible = ref(1)
let scrollToFn: (index: number) => void = () => {}

const easeInOutCubic = (x: number): number =>
  x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2

const clamp01 = (x: number): number => Math.min(1, Math.max(0, x))

const HANDOFF = 0.5

export const usePageVisibility = (index: number): ComputedRef<number> =>
  computed(() => easeInOutCubic(clamp01(1 - Math.abs(scrollProgress.value - index) / HANDOFF)))

const KNOT_GONE = 0.02

export const usePageReveal = (index: number): ComputedRef<number> =>
  computed(() => {
    const visible = clamp01(1 - Math.abs(scrollProgress.value - index) / HANDOFF)
    const gate = clamp01((KNOT_GONE - knotVisible.value) / KNOT_GONE)
    return easeInOutCubic(visible * gate)
  })

export const usePageStack = () => ({
  activeIndex,
  scrollProgress,
  knotVisible,
  scrollTo: (index: number) => scrollToFn(index),
  registerScrollTo: (fn: (index: number) => void) => { scrollToFn = fn },
})
