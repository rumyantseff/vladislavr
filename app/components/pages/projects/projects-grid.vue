<template>
  <div class="w-full h-full overflow-hidden flex flex-col gap-3 lg:gap-5">
    <PagesProjectsCarousel :projects="projects" :stacks="stacks" />
    <PagesProjectsRowGrid :projects="projects" :card-styles="cardStyles" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useCardTransition } from '~/composables/useCardTransition'
import { useProjects } from '~/composables/useProjects'

const projects = useProjects()

const stacks = computed(() => {
  const out = []
  for (let i = 0; i < projects.length; i += 3) out.push(projects.slice(i, i + 3))
  return out
})

const cardStyles = projects.map((_, i) =>
  useCardTransition({
    pageIndex: 2,
    index: i,
    count: projects.length,
    enter: { x: 90 },
    exit: { y: 260 },
    stagger: 0.5,
  }),
)
</script>
