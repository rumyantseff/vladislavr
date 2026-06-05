<template>
  <PagesAboutSkeleton v-if="isLoading" />
  <div v-else data-testid="page-about" class="relative w-full h-full bg-brand-950 p-4 sm:p-6 lg:p-10 pt-0! sm:pt-0! lg:pt-0!
              lg:overflow-hidden
              flex flex-col gap-6 lg:gap-8">
    <div aria-hidden="true" class="about-glow about-glow--left" />
    <div aria-hidden="true" class="about-glow about-glow--right" />

    <PagesAboutMarquee class="relative z-10" />
    <div class="relative z-10 flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
      <!-- left: image panel with intro text on top -->
      <div class="relative flex flex-col rounded-2xl lg:rounded-3xl overflow-hidden
                  bg-cover bg-center
                  p-6 sm:p-8 lg:p-10"
        style="background-image: url('/abstract-home-card.png')">
        <!-- dark overlay for text legibility -->
        <div aria-hidden="true" class="absolute inset-0 bg-linear-to-t from-brand-950/90 via-brand-950/60 to-brand-950/30" />
        <PagesAboutIntro class="relative z-10 h-full" />
      </div>

      <div class="flex flex-col gap-3 lg:gap-0">
        <div class="lg:hidden select-none pointer-events-none w-full"
          v-motion
          :initial="{ opacity: 0, y: -20 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 600, delay: 200 } }">
          <SharedMarqueeStrip text="services" direction="right" />
        </div>
        <PagesAboutServices class="h-full" />
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

<style scoped>
.about-glow {
  position: absolute;
  z-index: 0;
  pointer-events: none;
  border-radius: 9999px;
  filter: blur(90px);
}

.about-glow--left {
  left: -8%;
  top: 12%;
  width: 35%;
  height: 60%;
  background: radial-gradient(circle at center,
    rgba(185, 212, 47, 0.22) 0%, rgba(185, 212, 47, 0.07) 45%, transparent 70%);
}

.about-glow--right {
  right: -6%;
  bottom: -12%;
  width: 38%;
  height: 65%;
  background: radial-gradient(circle at center,
    rgba(255, 139, 51, 0.22) 0%, rgba(255, 139, 51, 0.06) 45%, transparent 70%);
}
</style>
