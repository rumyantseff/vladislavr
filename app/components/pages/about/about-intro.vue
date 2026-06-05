<template>
  <div class="flex flex-col items-end text-right gap-3 lg:gap-4">
    <h2
      v-motion
      :initial="{ opacity: 0, x: 50 }"
      :enter="{ opacity: 1, x: 0, transition: { duration: 700, delay: 300 } }"
      class="font-bold uppercase tracking-tight leading-[0.95] text-brand-950
             text-2xl sm:text-3xl lg:text-4xl xl:text-5xl">
       A comprehensive <br />look
    </h2>
    <p
      v-motion
      :initial="{ opacity: 0, x: 50 }"
      :enter="{ opacity: 1, x: 0, transition: { duration: 700, delay: 450 } }"
      class="text-sm lg:text-base text-brand-950/80 leading-relaxed max-w-sm">
      A glimpse into my world — the tools, technologies, and craft I use
      to build reliable, scalable, and visually consistent solutions.
    </p>
  </div>
</template>
