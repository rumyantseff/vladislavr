<template>
  <div class="hidden lg:grid h-full min-h-0 grid-cols-12 grid-rows-2 gap-3 lg:gap-2">
    <PagesAboutServiceCard v-for="(service, i) in services" :key="service.title"
      :title="service.title" :description="service.description"
      :tech="service.tech" :area="service.area" :available="service.available"
      :data-testid="`service-card-${i}`"
      :style="cardStyles[i].value"
      :class="[service.span, 'min-h-0']" />
  </div>
</template>

<script setup>
defineProps({
  services: { type: Array, required: true },
  cardStyles: { type: Array, required: true },
})
</script>
