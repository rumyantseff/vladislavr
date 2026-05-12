import { ref } from 'vue'

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

// Module-level reactive state — shared across all consumers, never serialized through SSR
const activeIndex = ref(0)
let scrollToFn: (index: number) => void = () => {}

export const usePageStack = () => ({
  activeIndex,
  scrollTo: (index: number) => scrollToFn(index),
  registerScrollTo: (fn: (index: number) => void) => { scrollToFn = fn },
})
