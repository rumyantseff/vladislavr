<template>
  <div class="w-full h-full overflow-hidden flex flex-col gap-3 lg:gap-5">
    <!-- Mobile: simple 2-col grid -->
    <div class="lg:hidden grid grid-cols-2 gap-3 h-full auto-rows-fr">
      <PagesProjectsProjectCard v-for="(p, i) in projects" :key="p.title"
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 600, delay: 400 + i * 100 } }"
        v-bind="p"
        :data-testid="`project-card-${i}`"
        class="h-full" />
    </div>

    <!-- Desktop: 2 separate flex rows for independent accordion hover -->
    <template v-for="(row, r) in [projects.slice(0, 3), projects.slice(3, 6)]" :key="r">
      <div class="hidden lg:flex flex-1 min-h-0 gap-5 projects-row">
        <PagesProjectsProjectCard v-for="(p, i) in row" :key="p.title"
          v-motion
          :initial="{ opacity: 0, y: 30 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 600, delay: 400 + (r * 3 + i) * 100 } }"
          v-bind="p"
          :data-testid="`project-card-${r * 3 + i}`"
          class="h-full flex-1 basis-0 transition-[flex-grow] duration-400 ease-out" />
      </div>
    </template>
  </div>
</template>

<script setup>
const projects = [
  {
    title: 'Mbrosia — Music Streaming UI',
    tags: ['Web', 'Vue', 'Design'],
    image: '/portfolio/mbrosia.svg',
    link: '#',
  },
  {
    title: 'Breathe Triangle — Wellness App',
    tags: ['Mobile', 'iOS', 'Animation'],
    image: '/portfolio/triangle.svg',
    link: '#',
  },
  {
    title: 'CI/CD Pipeline Automation',
    tags: ['DevOps', 'GitLab', 'Docker'],
    image: '/portfolio/mbrosia.svg',
    link: '#',
  },
  {
    title: 'E2E Testing Framework',
    tags: ['QA', 'Cypress', 'TypeScript'],
    image: '/portfolio/triangle.svg',
    link: '#',
  },
  {
    title: 'Brand Identity System',
    tags: ['Design', 'Branding'],
    image: '/portfolio/mbrosia.svg',
    link: '#',
  },
  {
    title: 'Internal Dashboard',
    tags: ['Dashboard', 'SaaS', 'Vue'],
    image: '/portfolio/triangle.svg',
    link: '#',
  },
]
</script>

<style scoped>
.projects-row > * {
  flex-grow: 1;
  transition: flex-grow 400ms cubic-bezier(0.4, 0, 0.2, 1);
}
.projects-row:hover > * {
  flex-grow: 0.6;
}
.projects-row > *:hover {
  flex-grow: 2;
}
</style>
