<template>
  <div class="lg:hidden flex flex-col gap-3 flex-1 min-h-0">
    <div ref="el" class="flex-1 min-h-0 overflow-x-auto snap-x snap-mandatory scroll-smooth
                [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <div class="flex h-full">
        <div v-for="(stack, s) in stacks" :key="s"
          class="shrink-0 w-full snap-start h-full flex flex-col gap-3 pb-1">
          <PagesProjectsProjectCard v-for="p in stack" :key="p.title"
            v-bind="p"
            :data-testid="`project-card-${projects.indexOf(p)}`"
            class="flex-1 min-h-0 w-full" />
        </div>
      </div>
    </div>
    <SharedCarouselNav :at-start="atStart" :at-end="atEnd"
      @prev="scrollByPage(-1)" @next="scrollByPage(1)" />
  </div>
</template>

<script setup>
import { useCarousel } from '~/composables/useCarousel'

defineProps({
  projects: { type: Array, required: true },
  stacks: { type: Array, required: true },
})

const { el, atStart, atEnd, scrollByPage } = useCarousel(1)
</script>
