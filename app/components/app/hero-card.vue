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
    ? 'bg-primary-font'
    : 'bg-secondary'
)
</script>
