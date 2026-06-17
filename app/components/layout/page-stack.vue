<template>
  <div :style="{ height: `${totalHeight}px` }" class="relative w-full">
    <div v-for="(page, i) in PAGE_STACK_PAGES" :key="page.path"
         :data-index="i"
         :style="{ zIndex: i + 1, height: `${slideHeight}px` }"
         class="sticky top-0 w-full overflow-hidden">
      <PagesHomeView v-if="i === 0" />
      <PagesAboutView v-else-if="i === 1" />
      <PagesProjectsView v-else-if="i === 2" />
      <PagesContactView v-else-if="i === 3" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { PAGE_STACK_PAGES, indexForPath, usePageStack, SITE_NAME } from '~/composables/usePageStack'

const props = defineProps<{ initialIndex?: number }>()

const route = useRoute()
const stack = usePageStack()

const isScrollingByClick = ref(false)
const scrollEl = ref<HTMLElement | null>(null)
const slideHeight = ref(0)

const MOVE_MS = 900
const DWELL_MS = 500
const SCROLL_MS = MOVE_MS * 2 + DWELL_MS
const SNAP_COOLDOWN_MS = SCROLL_MS
const TOUCH_THRESHOLD_PX = 50
let locked = false
let touchStartY = 0
let scrollRaf = 0

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

const easeInOutCubic = (t: number): number =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

function animateScrollTo(el: HTMLElement, to: number, duration: number) {
  cancelAnimationFrame(scrollRaf)
  if (duration <= 0) { el.scrollTop = to; return }
  const start = el.scrollTop
  const diff = to - start
  const mid = start + diff / 2
  let startTime = 0
  const step = (ts: number) => {
    if (!startTime) startTime = ts
    const elapsed = ts - startTime
    if (elapsed < MOVE_MS) {

      el.scrollTop = start + (diff / 2) * easeInOutCubic(elapsed / MOVE_MS)
    } else if (elapsed < MOVE_MS + DWELL_MS) {

      el.scrollTop = mid
    } else if (elapsed < SCROLL_MS) {

      el.scrollTop = mid + (diff / 2) * easeInOutCubic((elapsed - MOVE_MS - DWELL_MS) / MOVE_MS)
    } else {
      el.scrollTop = to
      return
    }
    scrollRaf = requestAnimationFrame(step)
  }
  scrollRaf = requestAnimationFrame(step)
}

function lockSnap() {
  locked = true
  setTimeout(() => { locked = false }, SNAP_COOLDOWN_MS)
}

function snapBy(delta: number) {
  if (locked) return
  const next = stack.activeIndex.value + delta
  if (next < 0 || next > PAGE_STACK_PAGES.length - 1) return
  lockSnap()
  scrollToIndex(next)
}

const totalHeight = computed(() => slideHeight.value * PAGE_STACK_PAGES.length)

const startIndex = props.initialIndex ?? indexForPath(route.path)
stack.activeIndex.value = startIndex

function measureSlide() {
  slideHeight.value = scrollEl.value?.clientHeight ?? window.innerHeight
}

function onScroll() {
  if (!scrollEl.value || slideHeight.value === 0) return
  const slideH = slideHeight.value

  stack.scrollProgress.value = scrollEl.value.scrollTop / slideH
  if (isScrollingByClick.value) return
  const scrollY = scrollEl.value.scrollTop + slideH / 2
  const max = PAGE_STACK_PAGES.length - 1
  const idx = Math.max(0, Math.min(max, Math.floor(scrollY / slideH)))
  if (idx !== stack.activeIndex.value) {
    stack.activeIndex.value = idx
    const targetPath = PAGE_STACK_PAGES[idx]!.path
    if (window.location.pathname !== targetPath) {
      window.history.replaceState(window.history.state, '', targetPath)
    }
  }
}

function scrollToIndex(index: number, smooth = true) {
  const clamped = Math.max(0, Math.min(PAGE_STACK_PAGES.length - 1, index))
  if (!scrollEl.value || slideHeight.value === 0) return
  const targetY = clamped * slideHeight.value
  const duration = smooth && !prefersReducedMotion() ? SCROLL_MS : 0
  isScrollingByClick.value = true
  animateScrollTo(scrollEl.value, targetY, duration)
  stack.activeIndex.value = clamped
  const targetPath = PAGE_STACK_PAGES[clamped]!.path
  if (window.location.pathname !== targetPath) {
    window.history.replaceState(window.history.state, '', targetPath)
  }
  setTimeout(() => { isScrollingByClick.value = false }, duration + 50)
}

stack.registerScrollTo(scrollToIndex)

watch(stack.activeIndex, (idx: number) => {
  if (typeof document === 'undefined') return
  const entry = PAGE_STACK_PAGES[idx]
  if (entry) document.title = `${SITE_NAME} — ${entry.text}`
}, { immediate: true })

function onWheel(e: WheelEvent) {
  e.preventDefault()
  if (Math.abs(e.deltaY) < 5) return
  snapBy(e.deltaY > 0 ? 1 : -1)
}

function onTouchStart(e: TouchEvent) {
  touchStartY = e.touches[0]?.clientY ?? 0
}

function onTouchEnd(e: TouchEvent) {
  const endY = e.changedTouches[0]?.clientY ?? 0
  const delta = touchStartY - endY
  if (Math.abs(delta) < TOUCH_THRESHOLD_PX) return
  snapBy(delta > 0 ? 1 : -1)
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'ArrowDown' || e.key === 'PageDown') {
    e.preventDefault()
    snapBy(1)
  } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
    e.preventDefault()
    snapBy(-1)
  }
}

onMounted(async () => {
  await nextTick()
  scrollEl.value = document.querySelector('[data-page-stack-scroll]') as HTMLElement | null
  if (!scrollEl.value) return
  measureSlide()
  window.addEventListener('resize', measureSlide)
  await nextTick()
  scrollToIndex(startIndex, false)
  scrollEl.value.addEventListener('scroll', onScroll, { passive: true })
  scrollEl.value.addEventListener('wheel', onWheel, { passive: false })
  scrollEl.value.addEventListener('touchstart', onTouchStart, { passive: true })
  scrollEl.value.addEventListener('touchend', onTouchEnd, { passive: true })
  window.addEventListener('keydown', onKeydown)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(scrollRaf)
  scrollEl.value?.removeEventListener('scroll', onScroll)
  scrollEl.value?.removeEventListener('wheel', onWheel)
  scrollEl.value?.removeEventListener('touchstart', onTouchStart)
  scrollEl.value?.removeEventListener('touchend', onTouchEnd)
  window.removeEventListener('resize', measureSlide)
  window.removeEventListener('keydown', onKeydown)
})
</script>
