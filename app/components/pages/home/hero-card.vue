<template>
  <div :class="['rounded-3xl overflow-hidden', variantClasses]">
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
    ? 'bg-white/40 backdrop-blur-xl border border-white/40'
    : 'bg-brand-950'
)
</script>
