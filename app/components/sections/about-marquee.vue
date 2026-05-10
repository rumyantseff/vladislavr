<template>
  <!-- Desktop: split-screen marquee -->
  <div class="hidden lg:grid grid-cols-2 w-full select-none pointer-events-none py-2 lg:py-4"
    v-motion
    :initial="{ opacity: 0, y: -20 }"
    :enter="{ opacity: 1, y: 0, transition: { duration: 600, delay: 100 } }">
    <AppMarqueeStrip text="about" direction="right" />
    <AppMarqueeStrip text="services" direction="right" />
  </div>
</template>
