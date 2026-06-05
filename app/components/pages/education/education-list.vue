<template>
  <div class="flex flex-col h-full divide-y divide-white/10">
    <div v-for="(item, i) in items" :key="item.title"
      v-motion
      :initial="{ opacity: 0, y: 30 }"
      :enter="{ opacity: 1, y: 0, transition: { duration: 600, delay: 400 + i * 100 } }"
      class="flex-1 min-h-0 flex items-center gap-4 lg:gap-8 py-4 lg:py-6">
      <!-- index -->
      <span class="shrink-0 text-tertiary-font/40 font-semibold text-sm lg:text-base tabular-nums w-6 lg:w-8">
        {{ String(i + 1).padStart(2, '0') }}
      </span>

      <!-- title -->
      <h3 class="flex-1 min-w-0 text-tertiary-font font-bold text-lg sm:text-xl lg:text-3xl leading-tight">
        {{ item.title }}
      </h3>

      <!-- meta -->
      <p class="hidden md:block shrink-0 w-48 lg:w-64 text-right text-tertiary-font/60 text-xs lg:text-sm leading-relaxed">
        {{ item.meta }}
      </p>

      <!-- action -->
      <a v-if="item.link" :href="item.link" target="_blank" rel="noopener"
        class="shrink-0 inline-flex items-center gap-2 rounded-full border border-white/20
               px-4 lg:px-5 py-1.5 lg:py-2 text-xs lg:text-sm font-medium text-tertiary-font
               hover:bg-white/10 transition-colors duration-200">
        View
        <SharedIconsArrowUpRight class="size-3.5 lg:size-4" />
      </a>
      <span v-else class="shrink-0 w-[4.5rem] lg:w-[5.5rem]" aria-hidden="true" />
    </div>
  </div>
</template>

<script setup>
const items = [
  {
    title: 'Secondary School of Electrical Engineering',
    meta: 'Hálova 16, Bratislava · 2017–2020 · Information & Computer Science, Computer Networks',
    link: null,
  },
  {
    title: 'Playwright: Web Automation Testing',
    meta: 'Udemy · Certificate',
    link: 'https://www.udemy.com/certificate/UC-edcee127-c200-4338-8261-f69c0ca2705e/',
  },
  {
    title: 'Cypress E2E Testing & Network Calls',
    meta: 'Coursera · Certificate',
    link: 'https://www.coursera.org/account/accomplishments/records/QYT228N56H70',
  },
  {
    title: 'Cisco CCNA — Routing & Switching',
    meta: 'Cisco · Introduction to Networks',
    link: null,
  },
]
</script>
