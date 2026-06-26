<template>
  <div class="lg:hidden flex flex-col gap-3">
    <div ref="el" class="overflow-x-auto snap-x snap-mandatory scroll-smooth
                [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <div class="grid grid-flow-col auto-cols-[calc(50%-0.375rem)] gap-3 pb-1">
        <PagesAboutServiceCard v-for="(service, i) in services" :key="service.title"
          v-motion
          :initial="{ opacity: 0, y: 30 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 600, delay: 400 + i * 120 } }"
          :title="service.title" :description="service.description"
          :tech="service.tech" :area="service.area" :available="service.available"
          :data-testid="`service-card-${i}`"
          class="shrink-0 snap-start" />
      </div>
    </div>
    <SharedCarouselNav :at-start="atStart" :at-end="atEnd"
      @prev="scrollByPage(-1)" @next="scrollByPage(1)" />
  </div>
</template>

<script setup>
import { useCarousel } from '~/composables/useCarousel'

defineProps({
  services: { type: Array, required: true },
})

const { el, atStart, atEnd, scrollByPage } = useCarousel(0.9)
</script>
