<template>
  <PagesProjectsSkeleton v-if="isLoading" />
  <div v-else data-testid="page-projects" class="w-full h-full bg-brand-50 p-4 sm:p-6 lg:p-10 pt-0! sm:pt-0! lg:pt-0!
              lg:overflow-hidden
              flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-6">
    <div class="sm:hidden select-none pointer-events-none"
      v-motion
      :initial="{ opacity: 0, y: -20 }"
      :enter="{ opacity: 1, y: 0, transition: { duration: 600, delay: 100 } }">
      <SharedMarqueeStrip text="Projects" direction="right" />
    </div>

    <PagesProjectsGrid class="flex-1 min-h-0"
      v-motion
      :initial="{ opacity: 0, y: 30 }"
      :enter="{ opacity: 1, y: 0, transition: { duration: 700, delay: 200 } }" />

    <div class="hidden sm:block w-12 lg:w-20 xl:w-24 shrink-0 select-none pointer-events-none"
      v-motion
      :initial="{ opacity: 0, x: 30 }"
      :enter="{ opacity: 1, x: 0, transition: { duration: 700, delay: 350 } }">
      <SharedMarqueeStripVertical text="Projects" direction="up" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const isLoading = ref(true)

onMounted(() => {
  requestAnimationFrame(() => {
    setTimeout(() => { isLoading.value = false }, 500)
  })
})
</script>
