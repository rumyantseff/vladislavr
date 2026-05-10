<template>
  <NuxtLink :to="to"
    class="inline-flex items-center px-4 py-2 rounded-full text-primary-font font-medium text-sm lg:text-base hover:bg-brand-100 transition">
    {{ text }}
  </NuxtLink>
</template>

<script setup>
defineProps({
  text: { type: String, required: true },
  to: { type: String, default: '#' },
})
</script>
