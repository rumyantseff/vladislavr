<template>
  <PagesAboutServiceCarousel :services="services" />
  <PagesAboutServiceGrid :services="services" :card-styles="cardStyles" />
</template>

<script setup>
import { computed } from 'vue'
import { useCardTransition } from '~/composables/useCardTransition'
import { usePageReveal } from '~/composables/usePageStack'
import { useI18n } from '~/composables/useI18n'

const { t } = useI18n()

const services = computed(() => [
  {
    area: 'devops',
    title: t('about.devops.title'),
    description: t('about.devops.desc'),
    span: 'sm:col-span-7',
    direction: 'down',
    tech: ['Linux', 'CI/CD', 'Kubernetes'],
  },
  {
    area: 'frontend',
    title: t('about.frontend.title'),
    description: t('about.frontend.desc'),
    span: 'sm:col-span-5',
    direction: 'down',
    tech: ['Vue', 'Nuxt', 'Tailwind'],
  },
  {
    area: 'qa',
    title: t('about.qa.title'),
    description: t('about.qa.desc'),
    span: 'sm:col-span-5',
    direction: 'up',
    tech: ['Cypress', 'Playwright', 'Postman'],
  },
  {
    area: 'brand',
    title: t('about.brand.title'),
    description: t('about.brand.desc'),
    span: 'sm:col-span-7',
    direction: 'up',
    tech: ['Figma', 'UX/UI', 'Inkscape'],
  },
])

const arrive = usePageReveal(1)

const CARD_COUNT = 4
const cardStyles = Array.from({ length: CARD_COUNT }, (_, i) =>
  useCardTransition({
    pageIndex: 1,
    index: i,
    count: CARD_COUNT,
    enter: { y: 60 },
    exit: { x: 160 },
    arrive,
  }),
)
</script>
