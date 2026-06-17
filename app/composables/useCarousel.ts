import { ref, onMounted, onBeforeUnmount, type Ref } from 'vue'

// Horizontal scroll carousel helper: tracks whether more content exists before/after
// (so prev/next arrows can hide at the ends) and pages by a fraction of the viewport.
export function useCarousel(pageFraction = 1) {
  const el: Ref<HTMLElement | null> = ref(null)
  const atStart = ref(true)
  const atEnd = ref(false)

  function update() {
    const n = el.value
    if (!n) return
    const max = n.scrollWidth - n.clientWidth
    atStart.value = n.scrollLeft <= 2
    atEnd.value = n.scrollLeft >= max - 2
  }

  function scrollByPage(dir: number) {
    const n = el.value
    if (!n) return
    n.scrollBy({ left: dir * n.clientWidth * pageFraction, behavior: 'smooth' })
  }

  let ro: ResizeObserver | null = null
  onMounted(() => {
    const n = el.value
    if (!n) return
    n.addEventListener('scroll', update, { passive: true })
    ro = new ResizeObserver(update)
    ro.observe(n)
    update()
  })
  onBeforeUnmount(() => {
    el.value?.removeEventListener('scroll', update)
    ro?.disconnect()
  })

  return { el, atStart, atEnd, scrollByPage }
}
