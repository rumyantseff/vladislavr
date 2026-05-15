<template>
  <div class="flex flex-col gap-4 lg:gap-6">
    <SharedHeadingDisplay
      v-motion
      :initial="{ opacity: 0, x: -60 }"
      :enter="{ opacity: 1, x: 0, transition: { duration: 700, delay: 300 } }"
      text="Hello" class="self-start text-left" />
    <SharedHeadingSubtitle
      v-motion
      :initial="{ opacity: 0, x: 60 }"
      :enter="{ opacity: 1, x: 0, transition: { duration: 700, delay: 500 } }"
      class="self-end text-right">
      IT Specialist with <span class="text-brand-700 font-semibold">5+ years</span> of commercial experience across
      <span class="text-brand-700 font-semibold">DevOps</span>,
      <span class="text-brand-700 font-semibold">Frontend Development</span>,
      <span class="text-brand-700 font-semibold">QA Engineering</span>, and
      <span class="text-brand-700 font-semibold">Brand Design</span>.
      I love combining technical expertise with design skills in delivering reliable, scalable, and visually consistent solutions.
    </SharedHeadingSubtitle>
  </div>
</template>
