<template>
  <template v-for="(row, r) in rows" :key="r">
    <div class="hidden lg:flex flex-1 min-h-0 gap-2 projects-row">
      <PagesProjectsProjectCard v-for="(p, i) in row" :key="p.title"
        v-bind="p"
        :data-testid="`project-card-${r * 3 + i}`"
        :style="cardStyles[r * 3 + i].value"
        class="h-full projects-card" />
    </div>
  </template>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  projects: { type: Array, required: true },

  cardStyles: { type: Array, required: true },
})

const rows = computed(() => [props.projects.slice(0, 3), props.projects.slice(3, 6)])
</script>

<style scoped>
/* each card is a fixed third of the row (gap-2 = 0.5rem between 3 cols = 1rem total), so a
   row with fewer than 3 cards (the last row) doesn't stretch to fill — it stays left-aligned. */
.projects-card {
  flex: 0 1 calc((100% - 1rem) / 3);
  min-width: 0;
  transition: flex-basis 600ms cubic-bezier(0.22, 1, 0.36, 1);
}

/* accordion on hover: hovered card grows, the others shrink (smoothly) */
.projects-row:hover .projects-card {
  flex-basis: calc((100% - 1rem) / 3 * 0.78);
}
.projects-row .projects-card:hover {
  flex-basis: calc((100% - 1rem) / 3 * 1.5);
}
</style>
