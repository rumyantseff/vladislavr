import { ref, onMounted } from 'vue'
import { usePageStack } from '~/composables/usePageStack'

export function usePageSkeleton(pageIndex: number) {
  const stack = usePageStack()
  const isLoading = ref(stack.activeIndex.value === pageIndex)

  onMounted(() => {
    if (!isLoading.value) return
    requestAnimationFrame(() => { setTimeout(() => { isLoading.value = false }, 500) })
  })

  return { isLoading }
}
