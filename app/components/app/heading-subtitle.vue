<template>
  <p class="font-medium leading-relaxed text-primary-font/70
            text-sm md:text-base lg:text-lg
            max-w-md lg:max-w-[58ch]">
    <slot>{{ text }}</slot>
  </p>
</template>

<script setup>
defineProps({
  text: { type: String, default: '' },
})
</script>
