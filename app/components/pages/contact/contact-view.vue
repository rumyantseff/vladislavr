<template>
  <PagesContactSkeleton v-if="isLoading" />
  <div v-else data-testid="page-contact" class="w-full h-full bg-brand-950 p-4 sm:p-6 lg:p-10 pt-0! sm:pt-0! lg:pt-0!
              overflow-hidden">
    <div class="relative w-full h-full bg-brand-950 border border-white/10 rounded-2xl lg:rounded-3xl
                p-4 sm:p-8 lg:p-12
                overflow-hidden
                flex flex-col gap-6 sm:gap-8 lg:gap-16">
      <!-- Ambient glow blobs -->
      <div aria-hidden="true" class="contact-glow contact-glow--1" />
      <div aria-hidden="true" class="contact-glow contact-glow--2" />
      <div aria-hidden="true" class="contact-glow contact-glow--3" />

      <PagesContactHero class="relative z-10"
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 700, delay: 200 } }" />
      <PagesContactFooter class="relative z-10 mt-auto"
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 700, delay: 400 } }" />
    </div>
  </div>
</template>

<style scoped>
.contact-glow {
  position: absolute;
  z-index: 0;
  pointer-events: none;
  border-radius: 9999px;
  filter: blur(90px);
}

.contact-glow--1 {
  right: 8%;
  bottom: -10%;
  width: 38%;
  height: 70%;
  background: radial-gradient(circle at center,
    rgba(185, 212, 47, 0.28) 0%, rgba(185, 212, 47, 0.08) 45%, transparent 70%);
}

.contact-glow--2 {
  right: 28%;
  bottom: -18%;
  width: 30%;
  height: 60%;
  background: radial-gradient(circle at center,
    rgba(255, 139, 51, 0.24) 0%, rgba(255, 139, 51, 0.06) 45%, transparent 70%);
}

.contact-glow--3 {
  right: -6%;
  top: 10%;
  width: 28%;
  height: 55%;
  background: radial-gradient(circle at center,
    rgba(194, 220, 81, 0.16) 0%, transparent 65%);
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
