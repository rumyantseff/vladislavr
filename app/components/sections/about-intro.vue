<template>
  <div class="flex flex-col items-start gap-6 lg:gap-8">
    <h2
      v-motion
      :initial="{ opacity: 0, x: -50 }"
      :enter="{ opacity: 1, x: 0, transition: { duration: 700, delay: 300 } }"
      class="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-primary-font leading-tight">
      A comprehensive look at what I do and how I deliver
    </h2>
    <p
      v-motion
      :initial="{ opacity: 0, x: -50 }"
      :enter="{ opacity: 1, x: 0, transition: { duration: 700, delay: 450 } }"
      class="text-base lg:text-lg text-primary-font/70 max-w-md leading-relaxed">
      A glimpse into my world — the tools, technologies, and craft I use
      to build reliable, scalable, and visually consistent solutions.
    </p>
    <button type="button"
      v-motion
      :initial="{ opacity: 0, y: 20 }"
      :enter="{ opacity: 1, y: 0, transition: { duration: 600, delay: 600 } }"
      class="inline-flex items-center bg-primary-font hover:bg-brand-900
             text-tertiary-font font-medium px-8 py-3 rounded-full
             transition-colors duration-300">
      Get in touch
    </button>
  </div>
</template>
