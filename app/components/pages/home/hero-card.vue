<template>
  <div :class="['rounded-3xl overflow-hidden', variantClasses]">
    <!-- one continuous scene sliced across tiles via background-size/position -->
    <div v-if="variant === 'image'" aria-hidden="true"
      class="absolute inset-0" :style="imageStyle" />
    <slot />
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: { type: String, default: 'light' },
  imagePosition: { type: String, default: 'top' }, // 'top' | 'bottom' | 'top-left' | 'top-right'
})

const variantClasses = computed(() => {
  if (props.variant === 'image') return ''
  return props.variant === 'dark'
    ? 'bg-white/10 backdrop-blur-xl border border-white/15'
    : 'bg-white/5 border border-white/10'
})

// The full scene is mapped onto the whole hero-cards block. Each tile enlarges
// the background to the block's size and positions it to show only its slice,
// so neighbouring tiles read as one continuous image.
// Rows are ~50% tall -> 200% height. Top split: left tile is 2/3 wide
// (1/0.666 ≈ 150%), right tile is 1/3 wide (1/0.333 ≈ 300%).
const SLICES = {
  'top':       { size: '100% 200%', pos: 'center top' },
  'bottom':    { size: '100% 200%', pos: 'center bottom' },
  'top-left':  { size: '150% 200%', pos: 'left top' },
  'top-right': { size: '300% 200%', pos: 'right top' },
}

const imageStyle = computed(() => {
  const s = SLICES[props.imagePosition] ?? SLICES.top
  return {
    backgroundImage: 'url("/abstract-home-card.png")',
    backgroundSize: s.size,
    backgroundPosition: s.pos,
    backgroundRepeat: 'no-repeat',
  }
})
</script>
