<template>
  <span class="block font-bold text-primary-font leading-[0.95] text-4xl sm:text-5xl lg:text-6xl xl:text-7xl tracking-tight">
    {{ text }}
  </span>
</template>

<script setup>
defineProps({
  text: { type: String, required: true },
})
</script>
