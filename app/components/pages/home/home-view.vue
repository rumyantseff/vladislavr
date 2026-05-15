<template>
  <PagesHomeSkeleton v-if="isLoading" />
  <div v-else class="w-full h-full bg-brand-50 p-4 sm:p-6 lg:p-10 pt-0! sm:pt-0! lg:pt-0!
              overflow-hidden
              grid gap-3 sm:gap-4 lg:gap-10
              grid-cols-12 grid-rows-[auto_1fr_auto]">
    <PagesHomeWelcomeText class="col-span-12 lg:col-span-7 lg:col-start-1 lg:row-start-1" />
    <PagesHomeHeroCards class="col-span-12 lg:col-span-5 lg:col-start-8 lg:row-start-1 lg:row-span-2" />
    <PagesHomeName class="col-span-12 lg:col-span-7 lg:col-start-1 lg:row-start-2 self-end" />
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
