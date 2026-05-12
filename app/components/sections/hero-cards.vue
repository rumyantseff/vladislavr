<template>
  <div class="relative w-full h-full max-w-md mx-auto lg:max-w-none">
    <AppHeroCard variant="light"
      v-motion
      :initial="{ opacity: 0, y: -40 }"
      :enter="{ opacity: 1, y: 0, transition: { duration: 700, delay: 400 } }"
      class="absolute top-0 left-0 right-0 bottom-[calc(50%+5px)]" />
    <AppHeroCard variant="light"
      v-motion
      :initial="{ opacity: 0, y: 40 }"
      :enter="{ opacity: 1, y: 0, transition: { duration: 700, delay: 500 } }"
      class="absolute top-[calc(50%+5px)] left-0 right-0 bottom-0" />
    <AppHeroCard variant="dark"
      v-motion
      :initial="{ opacity: 0, scale: 0.85 }"
      :enter="{ opacity: 1, scale: 1, transition: { duration: 800, delay: 700 } }"
      class="absolute bottom-0 left-16 right-16 h-[80%] lg:h-[507px] lg:left-32 lg:right-32 shadow-2xl" />
  </div>
</template>
