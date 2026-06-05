<template>
  <div class="flex flex-col items-start justify-center gap-6 lg:gap-8">
    <h2
      v-motion
      :initial="{ opacity: 0, x: -50 }"
      :enter="{ opacity: 1, x: 0, transition: { duration: 700, delay: 300 } }"
      class="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-tertiary-font leading-tight">
      A comprehensive look at what I do and how I deliver
    </h2>
    <p
      v-motion
      :initial="{ opacity: 0, x: -50 }"
      :enter="{ opacity: 1, x: 0, transition: { duration: 700, delay: 450 } }"
      class="text-base lg:text-lg text-tertiary-font leading-relaxed">
      A glimpse into my world — the tools, technologies, and craft I use
      to build reliable, scalable, and visually consistent solutions.
    </p>
  </div>
</template>
