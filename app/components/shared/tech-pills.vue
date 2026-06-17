<template>
  <div v-if="tags.length" :class="['flex flex-wrap gap-1.5 lg:gap-2', wrapClass]">
    <span v-for="t in tags" :key="t"
      class="px-3 py-1 rounded-full text-[10px] lg:text-xs font-medium
             bg-tertiary-font/10 text-tertiary-font
             border border-tertiary-font/30 backdrop-blur-sm">
      {{ t }}
    </span>
  </div>
</template>

<script setup>
defineProps({
  tags: { type: Array, default: () => [] },
  wrapClass: { type: String, default: '' },
})
</script>
