<template>
  <div class="flex flex-col gap-4 lg:gap-6">
    <SharedHeadingSubtitle
      v-motion
      :initial="{ opacity: 0, x: 60 }"
      :enter="{ opacity: 1, x: 0, transition: { duration: 700, delay: 500 } }"
      class="self-end">
      IT Specialist with <span class="text-brand-400 font-medium">5+ years</span> of commercial experience across
      <span class="text-brand-400 font-medium">DevOps</span>,
      <span class="text-brand-400 font-medium">Frontend Development</span>,
      <span class="text-brand-400 font-medium">QA Engineering</span>, and
      <span class="text-brand-400 font-medium">Brand Design</span>.
      I love combining technical expertise with design skills in delivering reliable, scalable, and visually consistent solutions.
    </SharedHeadingSubtitle>
  </div>
</template>
