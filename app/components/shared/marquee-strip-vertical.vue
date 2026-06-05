<template>
  <div class="overflow-hidden h-full">
    <div :class="['flex flex-col items-center h-max', animationClass]">
      <div v-for="i in 2" :key="i" class="flex flex-col items-center">
        <span v-for="n in repeat" :key="n"
          class="font-bold uppercase text-tertiary-font/15
                 text-5xl sm:text-6xl lg:text-7xl xl:text-8xl
                 leading-none py-4 lg:py-6
                 [writing-mode:vertical-rl] [text-orientation:mixed]">
          {{ text }}<span class="my-2 lg:my-4">·</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  text: { type: String, required: true },
  direction: { type: String, default: 'up' },
  repeat: { type: Number, default: 6 },
})

const animationClass = computed(() =>
  props.direction === 'down' ? 'animate-marquee-down' : 'animate-marquee-up'
)
</script>
