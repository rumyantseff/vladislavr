import { ref, onMounted, onBeforeUnmount } from 'vue'

export function useDropdownToggle() {
  const open = ref(false)
  const root = ref<HTMLElement | null>(null)

  const close = () => { open.value = false }
  const toggle = () => { open.value = !open.value }

  const onDocClick = (e: Event) => {
    if (open.value && root.value && !root.value.contains(e.target as Node)) close()
  }
  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape') close()
  }

  onMounted(() => {
    document.addEventListener('click', onDocClick)
    window.addEventListener('keydown', onKey)
  })
  onBeforeUnmount(() => {
    document.removeEventListener('click', onDocClick)
    window.removeEventListener('keydown', onKey)
  })

  return { open, root, close, toggle }
}
