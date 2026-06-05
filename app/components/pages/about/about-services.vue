<template>
  <!-- Mobile carousel (< sm) -->
  <div class="sm:hidden overflow-x-auto snap-x snap-mandatory scroll-smooth
              [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
    <div class="grid grid-flow-col auto-cols-[calc(50%-0.375rem)] gap-3 pb-2">
      <PagesAboutServiceCard v-for="(service, i) in services" :key="service.title"
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 600, delay: 500 + i * 120 } }"
        :title="service.title" :description="service.description" :initials="service.initials"
        :direction="service.direction"
        :image="service.image"
        :data-testid="`service-card-${i}`"
        :class="['shrink-0', i % 2 === 0 ? 'snap-start' : '']" />
    </div>
  </div>

  <!-- Desktop / tablet bento grid (sm+) -->
  <div class="hidden sm:grid h-full grid-cols-12 grid-rows-2 gap-3 lg:gap-2 auto-rows-fr">
    <PagesAboutServiceCard v-for="(service, i) in services" :key="service.title"
      v-motion
      :initial="{ opacity: 0, y: 30 }"
      :enter="{ opacity: 1, y: 0, transition: { duration: 600, delay: 500 + i * 120 } }"
      :title="service.title" :description="service.description" :initials="service.initials"
      :direction="service.direction"
      :image="service.image"
      :data-testid="`service-card-${i}`"
      :class="service.span" />
  </div>
</template>

<script setup>
const services = [
  {
    title: 'DevOps',
    initials: 'DV',
    description: 'CI/CD pipelines, infrastructure automation and reliable deployments that keep teams shipping safely.',
    span: 'sm:col-span-7',
    direction: 'down',
    image: '/services/devops.svg',
  },
  {
    title: 'Frontend Development',
    initials: 'FE',
    description: 'Modern, performant web interfaces built with Vue and Nuxt — accessible, animated, and responsive.',
    span: 'sm:col-span-5',
    direction: 'down',
    image: '/services/frontend.svg',
  },
  {
    title: 'QA Engineering',
    initials: 'QA',
    description: 'End-to-end testing strategies that catch regressions early and protect critical user flows.',
    span: 'sm:col-span-5',
    direction: 'up',
    image: '/services/e2e.svg',
  },
  {
    title: 'Brand Design',
    initials: 'BD',
    description: 'Visual systems and identity work that connect product, brand, and experience into one consistent voice.',
    span: 'sm:col-span-7',
    direction: 'up',
    image: null,
  },
]
</script>
