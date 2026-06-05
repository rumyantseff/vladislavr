<template>
  <div data-hero-cards class="relative w-full h-full max-w-md mx-auto lg:max-w-none">
    <!-- top row split into two: left 2/3, right 1/3 -->
    <!-- <PagesHomeHeroCard variant="image" image-position="top-left"
      v-motion
      :initial="{ opacity: 0, y: -40 }"
      :enter="{ opacity: 1, y: 0, transition: { duration: 700, delay: 400 } }"
      class="absolute top-0 left-0 right-[calc(33.333%+5px)] bottom-[calc(50%+5px)]" />
    <PagesHomeHeroCard variant="image" image-position="top-right"
      v-motion
      :initial="{ opacity: 0, y: -40 }"
      :enter="{ opacity: 1, y: 0, transition: { duration: 700, delay: 450 } }"
      class="absolute top-0 left-[calc(66.666%+5px)] right-0 bottom-[calc(50%+5px)]" />
    <PagesHomeHeroCard variant="image" image-position="bottom"
      v-motion
      :initial="{ opacity: 0, y: 40 }"
      :enter="{ opacity: 1, y: 0, transition: { duration: 700, delay: 500 } }"
      class="absolute top-[calc(50%+5px)] left-0 right-0 bottom-0" /> -->

    <!-- continuous bottom-up gradient fade across the whole image section -->
    <!-- <div aria-hidden="true"
      class="pointer-events-none absolute inset-0 rounded-3xl
             bg-linear-to-t from-brand-950 via-brand-950/40 to-transparent" /> -->
    <!-- glass card on top (original centre card) -->
    <!-- <PagesHomeHeroCard variant="dark"
      v-motion
      :initial="{ opacity: 0, scale: 0.85 }"
      :enter="{ opacity: 1, scale: 1, transition: { duration: 800, delay: 700 } }"
      class="absolute bottom-0 left-16 right-16 h-[80%] lg:h-[507px] lg:left-32 lg:right-32 shadow-2xl" /> -->
  </div>
</template>
