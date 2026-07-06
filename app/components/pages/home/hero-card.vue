<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: { type: String, default: 'light' },
  imagePosition: { type: String, default: 'top' },
})

const variantClasses = computed(() => {
  if (props.variant === 'image') return ''
  return props.variant === 'dark'
    ? 'bg-white/10 backdrop-blur-xl border border-white/15'
    : 'bg-white/5 border border-white/10'
})

const SLICES = {
  'top':       { size: '100% 200%', pos: 'center top' },
  'bottom':    { size: '100% 200%', pos: 'center bottom' },
  'top-left':  { size: '150% 200%', pos: 'left top' },
  'top-right': { size: '300% 200%', pos: 'right top' },
}

const imageStyle = computed(() => {
  const s = SLICES[props.imagePosition] ?? SLICES.top
  return {
    backgroundImage: `image-set(url("/abstract-home-card.webp") type("image/webp"), url("/abstract-home-card.png") type("image/png"))`,
    backgroundSize: s.size,
    backgroundPosition: s.pos,
    backgroundRepeat: 'no-repeat',
  }
})
</script>

<template>
  <div :class="['rounded-3xl overflow-hidden', variantClasses]">
    <div v-if="variant === 'image'" aria-hidden="true"
      class="absolute inset-0" :style="imageStyle" />
    <slot />
  </div>
</template>
