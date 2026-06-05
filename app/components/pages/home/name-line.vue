<template>
  <span class="block font-medium text-tertiary-font leading-[1.0] text-4xl sm:text-5xl lg:text-6xl xl:text-8xl tracking-tight">
    {{ text }}
  </span>
</template>

<script setup>
defineProps({
  text: { type: String, required: true },
})
</script>
