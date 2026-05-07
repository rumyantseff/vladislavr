<template>
  <p class="font-medium leading-relaxed text-primary-font/70
            text-sm md:text-base lg:text-lg
            max-w-md lg:max-w-[58ch]">
    {{ text }}
  </p>
</template>

<script setup>
defineProps({
  text: { type: String, required: true },
})
</script>
