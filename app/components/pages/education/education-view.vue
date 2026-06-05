<template>
  <PagesEducationSkeleton v-if="isLoading" />
  <div v-else data-testid="page-education" class="relative w-full h-full bg-brand-950 p-4 sm:p-6 lg:p-10 pt-0! sm:pt-0! lg:pt-0!
              lg:overflow-hidden
              flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-6">
    <div aria-hidden="true" class="education-glow education-glow--center" />

    <!-- Mobile: horizontal marquee on top -->
    <div class="relative z-10 sm:hidden select-none pointer-events-none"
      v-motion
      :initial="{ opacity: 0, y: -20 }"
      :enter="{ opacity: 1, y: 0, transition: { duration: 600, delay: 100 } }">
      <SharedMarqueeStrip text="Education" direction="right" />
    </div>

    <!-- Desktop: vertical marquee on the LEFT -->
    <div class="relative z-10 hidden sm:block w-12 lg:w-20 xl:w-24 shrink-0 select-none pointer-events-none"
      v-motion
      :initial="{ opacity: 0, x: -30 }"
      :enter="{ opacity: 1, x: 0, transition: { duration: 700, delay: 350 } }">
      <SharedMarqueeStripVertical text="Education" direction="up" />
    </div>

    <PagesEducationList class="relative z-10 flex-1 min-h-0"
      v-motion
      :initial="{ opacity: 0, y: 30 }"
      :enter="{ opacity: 1, y: 0, transition: { duration: 700, delay: 200 } }" />
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

<style scoped>
.education-glow {
  position: absolute;
  z-index: 0;
  pointer-events: none;
  border-radius: 9999px;
  filter: blur(90px);
}

.education-glow--center {
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 55%;
  height: 70%;
  background: radial-gradient(circle at center,
    rgba(185, 212, 47, 0.22) 0%, rgba(185, 212, 47, 0.08) 45%, transparent 70%);
}
</style>
