<template>
  <div :class="[
        'group relative z-0 hover:z-10 bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-brand-950 hover:border-transparent',
        'text-tertiary-font',
        'rounded-xl lg:rounded-2xl p-3 sm:p-4 lg:p-8 pb-10 sm:pb-12 lg:pb-16',
        'h-full min-h-24 sm:min-h-28 lg:min-h-36',
        'transition-all duration-500 ease-out',
        'hover:shadow-2xl cursor-pointer overflow-hidden',
      ]">

    <span class="dot-mesh" aria-hidden="true" />

    <SharedGlowBubbles />

    <div class="relative z-10">
      <h3 class="text-sm sm:text-base lg:text-xl font-semibold mb-1.5 sm:mb-2 lg:mb-3">{{ title }}</h3>
      <p class="text-xs sm:text-sm lg:text-base opacity-80 leading-relaxed">{{ description }}</p>

      <SharedTechPills :tags="tech" wrap-class="mt-3 lg:mt-4" />
    </div>

    <SharedGradientArrowButton tag="button" :aria-label="`Hire for ${title}`"
      @click.stop="goToForm"
      class="absolute z-10 bottom-2 right-2 sm:bottom-3 sm:right-3 lg:bottom-6 lg:right-6
             opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0" />
  </div>
</template>

<script setup>
import { useContactStore } from '~/stores/contact'

const props = defineProps({
  title: { type: String, required: true },
  description: { type: String, required: true },
  tech: { type: Array, default: () => [] },
  area: { type: String, default: '' },
})

const contact = useContactStore()

function goToForm() {
  if (props.area) contact.setArea(props.area)
  navigateTo('/send-message')
}
</script>

<style scoped>
.dot-mesh {
  position: absolute;
  inset: 0;
  z-index: 0;
  border-radius: inherit;
  pointer-events: none;
  background-image: radial-gradient(rgba(255, 255, 255, 0.16) 1px, transparent 1.4px);
  background-size: 11px 11px;
  background-position: 0 0;

  -webkit-mask-image: radial-gradient(120% 110% at 0% 100%, #000 0%, rgba(0, 0, 0, 0.5) 42%, transparent 75%);
  mask-image: radial-gradient(120% 110% at 0% 100%, #000 0%, rgba(0, 0, 0, 0.5) 42%, transparent 75%);
  opacity: 0.9;
}
</style>
