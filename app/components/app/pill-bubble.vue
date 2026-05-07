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
    ? 'bg-primary-font text-tertiary-font'
    : 'bg-secondary text-primary-font'
)
</script>
