<template>
  <span class="inline-flex items-center border border-primary-font/20 text-primary-font
               rounded-full px-4 py-1 text-xs font-medium uppercase tracking-wider">
    {{ text }}
  </span>
</template>

<script setup>
defineProps({
  text: { type: String, required: true },
})
</script>
