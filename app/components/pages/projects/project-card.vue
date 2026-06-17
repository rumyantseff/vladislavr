<template>
  <a :href="comingSoon ? undefined : link" :target="comingSoon ? undefined : '_blank'" rel="noopener"
    class="group relative block rounded-xl lg:rounded-2xl h-full"
    :class="comingSoon ? 'cursor-default' : 'cursor-pointer'">

    <div class="absolute inset-0 rounded-xl lg:rounded-2xl overflow-hidden"
      :class="{ 'card-cut': !comingSoon }">

      <img v-if="!comingSoon" :src="image" :alt="title"
        class="absolute inset-0 w-full h-full object-cover" />

      <canvas v-else ref="blurCanvas"
        class="absolute inset-0 w-full h-full" />

      <div class="absolute inset-0
                  bg-brand-950/45 backdrop-blur-[3px]
                  mask-[linear-gradient(to_top,black_0%,black_25%,transparent_90%)]
                  opacity-0 group-hover:opacity-100
                  transition-opacity duration-500
                  flex flex-col justify-end p-4 lg:p-6">
        <SharedTechPills :tags="tags" wrap-class="mb-3" />
        <h3 class="text-tertiary-font font-semibold text-sm lg:text-lg leading-tight pr-16 lg:pr-20">
          {{ title }}
        </h3>
      </div>

      <span v-if="comingSoon"
        class="absolute bottom-3 right-3 lg:bottom-5 lg:right-5 z-10
               px-4 py-2 lg:px-5 lg:py-2.5 rounded-full
               text-xs lg:text-base font-bold uppercase tracking-wide
               bg-brand-950/70 text-tertiary-font border border-tertiary-font/30 backdrop-blur-sm">
        {{ t('projects.comingSoon') }}
      </span>
    </div>

    <SharedGradientArrowButton v-if="!comingSoon" tag="div"
      class="absolute bottom-1.5 right-1.5 lg:bottom-2 lg:right-2" />
  </a>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from '~/composables/useI18n'
import { useCanvasBlur } from '~/composables/useCanvasBlur'

const { t } = useI18n()

const props = defineProps({
  title: { type: String, required: true },
  tags: { type: Array, default: () => [] },
  image: { type: String, required: true },
  link: { type: String, default: '#' },
  status: { type: String, default: 'published' },
})

const comingSoon = computed(() => props.status === 'coming_soon')

const blurCanvas = ref(null)
useCanvasBlur(blurCanvas, () => props.image, () => comingSoon.value)
</script>

<style scoped>
.card-cut {
  -webkit-mask-image: radial-gradient(circle 38px at calc(100% - 30px) calc(100% - 30px),
    transparent 37px, black 38px);
          mask-image: radial-gradient(circle 38px at calc(100% - 30px) calc(100% - 30px),
    transparent 37px, black 38px);
}

@media (min-width: 1024px) {
  .card-cut {
    -webkit-mask-image: radial-gradient(circle 46px at calc(100% - 36px) calc(100% - 36px),
      transparent 45px, black 46px);
            mask-image: radial-gradient(circle 46px at calc(100% - 36px) calc(100% - 36px),
      transparent 45px, black 46px);
  }
}
</style>
