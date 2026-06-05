<template>
  <p class="font-extralight leading-relaxed text-tertiary-font/70
            text-sm md:text-base lg:text-xl
            max-w-md lg:max-w-[560px]">
    <slot>{{ text }}</slot>
  </p>
</template>

<script setup>
defineProps({
  text: { type: String, default: '' },
})
</script>
