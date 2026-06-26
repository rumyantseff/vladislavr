<template>
  <div @click="goToForm" :class="[
        'group relative z-0 hover:z-10 bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-brand-950 hover:border-transparent',
        'text-tertiary-font',
        'rounded-xl lg:rounded-2xl p-3 sm:p-4 lg:p-8 pb-10 sm:pb-12 lg:pb-16',
        'h-full min-h-24 sm:min-h-28 lg:min-h-36',
        'transition-all duration-500 ease-out',
        'hover:shadow-2xl overflow-hidden',
        available ? 'cursor-pointer' : 'cursor-not-allowed',
      ]">

    <span class="dot-mesh" aria-hidden="true" />

    <SharedGlowBubbles />

    <div class="relative z-10">
      <h3 class="text-sm sm:text-base lg:text-xl font-semibold mb-1.5 sm:mb-2 lg:mb-3">{{ title }}</h3>
      <p class="text-xs sm:text-sm lg:text-base opacity-80 leading-relaxed">{{ description }}</p>

      <SharedTechPills :tags="tech" wrap-class="mt-3 lg:mt-4" />
    </div>

    <!-- the whole card opens the form (prefilled with this area). available => a hire arrow;
         not yet available => a disabled "Unavailable" pill making clear it can't be booked. -->
    <SharedGradientArrowButton v-if="available" tag="div" :aria-label="`Hire for ${title}`"
      class="absolute z-10 bottom-2 right-2 sm:bottom-3 sm:right-3 lg:bottom-6 lg:right-6
             opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0" />

    <span v-else
      class="absolute z-10 bottom-2 right-2 sm:bottom-3 sm:right-3 lg:bottom-6 lg:right-6
             inline-flex items-center rounded-full
             px-2.5 py-1 sm:px-3 sm:py-1.5
             text-[10px] sm:text-xs font-semibold uppercase tracking-wide
             bg-white/10 text-tertiary-font/60 border border-white/15 select-none">
      {{ t('area.unavailable') }}
    </span>
  </div>
</template>

<script setup>
import { useContactStore } from '~/stores/contact'
import { useLocale } from '~/composables/useLocale'
import { useI18n } from '~/composables/useI18n'
import { localizedPath } from '~/i18n/routes'

const props = defineProps({
  title: { type: String, required: true },
  description: { type: String, required: true },
  tech: { type: Array, default: () => [] },
  area: { type: String, default: '' },
  available: { type: Boolean, default: true },
})

const contact = useContactStore()
const { currentLocale } = useLocale()
const { t } = useI18n()

function goToForm() {
  if (!props.available) return
  if (props.area) contact.setArea(props.area)
  navigateTo(localizedPath('send-message', currentLocale.value))
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
