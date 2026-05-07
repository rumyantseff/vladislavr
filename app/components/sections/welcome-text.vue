<template>
  <div class="flex flex-col gap-4 lg:gap-6">
    <AppHeadingDisplay text="Hello" class="self-start text-left" />
    <AppHeadingSubtitle :text="subtitle" class="self-end text-right" />
  </div>
</template>

<script setup>
const subtitle = "IT Specialist with 5+ years of commercial experience across DevOps, Frontend Development, QA Engineering, and Brand Design. I love combining technical expertise with design skills in delivering reliable, scalable, and visually consistent solutions."
</script>
