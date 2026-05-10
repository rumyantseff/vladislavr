<template>
  <a :href="link" target="_blank" rel="noopener" :aria-label="label"
    class="size-10 rounded-full flex items-center justify-center
           text-tertiary-font/70 hover:text-tertiary-font
           hover:bg-tertiary-font/10
           transition-colors duration-300">
    <slot />
  </a>
</template>

<script setup>
defineProps({
  link: { type: String, required: true },
  label: { type: String, default: '' },
})
</script>
