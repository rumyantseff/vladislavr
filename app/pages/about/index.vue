<template>
  <SectionsAboutSkeleton v-if="isLoading" />
  <div v-else class="w-full h-full px-4 sm:px-6 lg:px-10 pb-4 sm:pb-6 lg:pb-10
              lg:overflow-hidden
              flex flex-col gap-6 lg:gap-8">
    <SectionsAboutMarquee />
    <div class="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
      <div class="flex flex-col gap-3 lg:gap-0">
        <div class="lg:hidden select-none pointer-events-none w-full"
          v-motion
          :initial="{ opacity: 0, y: -20 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 600, delay: 100 } }">
          <AppMarqueeStrip text="about" direction="right" />
        </div>
        <SectionsAboutIntro />
      </div>
      <div class="flex flex-col gap-3 lg:gap-0">
        <div class="lg:hidden select-none pointer-events-none w-full"
          v-motion
          :initial="{ opacity: 0, y: -20 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 600, delay: 200 } }">
          <AppMarqueeStrip text="services" direction="right" />
        </div>
        <SectionsAboutServices />
      </div>
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
