<template>
  <SectionsSkeleton v-if="isLoading" />
  <div v-else class="w-full p-4 sm:p-6 lg:p-10 h-screen overflow-hidden
              grid gap-3 sm:gap-4 lg:gap-10
              grid-cols-12 grid-rows-[auto_auto_1fr_auto] lg:grid-rows-[auto_1fr_auto]">
    <SectionsNavigation class="col-span-12" />
    <SectionsWelcomeText class="col-span-12 lg:col-span-7 lg:col-start-1 lg:row-start-2" />
    <SectionsHeroCards class="col-span-12 lg:col-span-5 lg:col-start-8 lg:row-start-2 lg:row-span-2" />
    <SectionsName class="col-span-12 lg:col-span-7 lg:col-start-1 lg:row-start-3 self-end" />
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
