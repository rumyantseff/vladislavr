<template>
  <div class="flex items-center justify-between">
    <button v-show="!atStart" type="button" aria-label="Previous" @click="$emit('prev')"
      class="h-7 w-16 rounded-full border border-tertiary-font/40 hover:border-tertiary-font/80
             text-tertiary-font/80 hover:text-tertiary-font transition rotate-180">
      <SharedLongArrow />
    </button>
    <span class="flex-1" />
    <button v-show="!atEnd" type="button" aria-label="Next" @click="$emit('next')"
      class="h-7 w-16 rounded-full border border-tertiary-font/40 hover:border-tertiary-font/80
             text-tertiary-font/80 hover:text-tertiary-font transition">
      <SharedLongArrow />
    </button>
  </div>
</template>

<script setup>
defineProps({
  atStart: { type: Boolean, default: false },
  atEnd: { type: Boolean, default: false },
})
defineEmits(['prev', 'next'])
</script>
