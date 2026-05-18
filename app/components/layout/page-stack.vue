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
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { PAGE_STACK_PAGES, indexForPath, usePageStack } from '~/composables/usePageStack'

const props = defineProps<{ initialIndex?: number }>()

const route = useRoute()
const stack = usePageStack()

const isScrollingByClick = ref(false)
const scrollEl = ref<HTMLElement | null>(null)
const slideHeight = ref(0)

const totalHeight = computed(() => slideHeight.value * PAGE_STACK_PAGES.length)

const startIndex = props.initialIndex ?? indexForPath(route.path)
stack.activeIndex.value = startIndex

function measureSlide() {
  slideHeight.value = scrollEl.value?.clientHeight ?? window.innerHeight
}

function onScroll() {
  if (isScrollingByClick.value || !scrollEl.value || slideHeight.value === 0) return
  const slideH = slideHeight.value
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
  isScrollingByClick.value = true
  scrollEl.value.scrollTo({ top: targetY, behavior: smooth ? 'smooth' : 'auto' })
  stack.activeIndex.value = clamped
  const targetPath = PAGE_STACK_PAGES[clamped]!.path
  if (window.location.pathname !== targetPath) {
    window.history.replaceState(window.history.state, '', targetPath)
  }
  setTimeout(() => { isScrollingByClick.value = false }, smooth ? 800 : 50)
}

stack.registerScrollTo(scrollToIndex)

onMounted(async () => {
  await nextTick()
  scrollEl.value = document.querySelector('[data-page-stack-scroll]') as HTMLElement | null
  if (!scrollEl.value) return
  measureSlide()
  window.addEventListener('resize', measureSlide)
  await nextTick()
  scrollToIndex(startIndex, false)
  scrollEl.value.addEventListener('scroll', onScroll, { passive: true })
})

onBeforeUnmount(() => {
  scrollEl.value?.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', measureSlide)
})
</script>
