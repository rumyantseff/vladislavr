<template>
  <div class="w-full h-full overflow-hidden">
    <div class="grid grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-5 h-full auto-rows-fr">
      <AppProjectCard v-for="(p, i) in projects" :key="p.title"
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 600, delay: 400 + i * 100 } }"
        v-bind="p"
        class="aspect-auto! h-full" />
    </div>
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
