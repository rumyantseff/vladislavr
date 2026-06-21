<template>
  <div class="overflow-hidden w-full">
    <div :class="['flex whitespace-nowrap w-max will-change-transform', animationClass]">
      <span v-for="i in 2" :key="i" class="flex items-center">
        <span v-for="n in repeat" :key="n"
          class="font-bold uppercase text-tertiary-font/15
                 text-5xl sm:text-6xl lg:text-7xl xl:text-8xl
                 leading-none px-4 lg:px-8">
          {{ text }}<span class="mx-2 lg:mx-4">·</span>
        </span>
      </span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  text: { type: String, required: true },
  direction: { type: String, default: 'left' },
  repeat: { type: Number, default: 6 },
})

const animationClass = computed(() =>
  props.direction === 'right' ? 'animate-marquee-right' : 'animate-marquee-left'
)
</script>
