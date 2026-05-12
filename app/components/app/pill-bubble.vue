<template>
  <div :class="['rounded-full px-6 py-3', variantClasses]">
    <slot />
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: { type: String, default: 'light' },
})

const variantClasses = computed(() =>
  props.variant === 'dark'
    ? 'bg-brand-900 text-tertiary-font'
    : 'bg-white/40 backdrop-blur-xl text-primary-font shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-white/40'
)
</script>
