<template>
  <SectionsContactSkeleton v-if="isLoading" />
  <div v-else class="w-full h-full bg-brand-50 p-4 sm:p-6 lg:p-10 pt-0! sm:pt-0! lg:pt-0!
              overflow-hidden">
    <div class="w-full h-full bg-brand-950 rounded-2xl lg:rounded-3xl
                p-4 sm:p-8 lg:p-12
                overflow-hidden
                flex flex-col gap-6 sm:gap-8 lg:gap-16">
      <SectionsContactHero
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 700, delay: 200 } }" />
      <SectionsContactFooter class="mt-auto"
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 700, delay: 400 } }" />
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
