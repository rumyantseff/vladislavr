<template>
  <PagesHomeSkeleton v-if="isLoading" />
  <div v-else data-testid="page-home" class="relative w-full h-full bg-brand-950 p-4 sm:p-6 lg:p-10 pt-0! sm:pt-0! lg:pt-0!
              overflow-hidden
              grid gap-3 sm:gap-4 lg:gap-10
              grid-cols-12 grid-rows-[auto_1fr_auto]">
    <div aria-hidden="true" class="home-glow" />
    <div aria-hidden="true" class="home-glow home-glow--right" />
    <PagesHomeHelloOverlay />
    <PagesHomeInfoCard class="relative z-20 hidden lg:flex lg:col-span-5 lg:col-start-8 lg:row-start-1 justify-self-end"
      v-motion
      :initial="{ opacity: 0, y: -30 }"
      :enter="{ opacity: 1, y: 0, transition: { duration: 700, delay: 600 } }" />
    <PagesHomeHeroCards class="relative z-10 col-span-12 lg:col-span-7 lg:col-start-1 lg:row-start-1 lg:row-span-2" />
    <PagesHomeName class="relative z-10 col-span-12 lg:col-span-7 lg:col-start-1 lg:row-start-3 self-end" />
    <PagesHomeWelcomeText class="relative z-10 col-span-12 lg:col-span-5 lg:col-start-8 lg:row-start-3 self-end" />
  </div>
</template>

<style scoped>
.home-glow {
  position: absolute;
  z-index: 0;
  left: -15%;
  bottom: 5%;
  width: 70%;
  height: 80%;
  pointer-events: none;
  background: radial-gradient(ellipse at center,
    rgba(185, 212, 47, 0.40) 0%,
    rgba(185, 212, 47, 0.16) 35%,
    transparent 70%);
  filter: blur(70px);
}

.home-glow--right {
  left: auto;
  bottom: auto;
  right: 10%;
  top: 32%;
  width: 34%;
  height: 50%;
  background: radial-gradient(ellipse at center,
    rgba(194, 220, 81, 0.30) 0%,
    rgba(185, 212, 47, 0.10) 30%,
    transparent 58%);
  filter: blur(100px);
}
</style>

<script setup>
import { ref, onMounted } from 'vue'

const isLoading = ref(true)

onMounted(() => {
  requestAnimationFrame(() => {
    setTimeout(() => { isLoading.value = false }, 500)
  })
})
</script>
