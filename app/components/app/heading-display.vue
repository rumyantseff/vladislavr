<template>
  <h1 class="font-light tracking-tight leading-none text-primary-font
             text-7xl md:text-8xl lg:text-9xl xl:text-[10rem]">
    {{ text }}
  </h1>
</template>

<script setup>
defineProps({
  text: { type: String, required: true },
})
</script>
