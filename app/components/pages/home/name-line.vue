<template>
  <span class="block uppercase font-light tracking-normal leading-[0.95] text-tertiary-font
               text-4xl sm:text-5xl lg:text-7xl xl:text-8xl">
    {{ text }}
  </span>
</template>

<script setup>
defineProps({
  text: { type: String, required: true },
})
</script>
