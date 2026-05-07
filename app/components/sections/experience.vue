<template>
  <div>
    <h3 class="text-secondary-font flex items-center gap-2 mt-12">
      <AppIconsBriefcase class="size-6" />
      Experience
    </h3>
    <ol class="relative my-4 lg:my-8 py-10 px-4 lg:px-8">
      <div class="absolute left-1/2 top-0 bottom-0 w-px bg-secondary-font/30 -translate-x-1/2" aria-hidden="true"></div>
      <li v-for="(e, i) in experience" :key="i" class="relative grid grid-cols-2 gap-4 lg:gap-12 mb-12 last:mb-0">
        <div :class="i % 2 === 0 ? 'text-right pr-8 lg:pr-12' : 'col-start-2 pl-8 lg:pl-12'">
          <template v-if="i % 2 === 0">
            <h4 class="text-primary-font font-bold">{{ e.section }}</h4>
            <p class="text-primary-font text-base">{{ e.location }}</p>
            <p class="text-primary-font mt-2">{{ e.description }}</p>
          </template>
          <template v-else>
            <p class="text-secondary-font font-bold">{{ e.years }}</p>
          </template>
        </div>
        <div :class="i % 2 === 0 ? 'pl-8 lg:pl-12' : 'col-start-1 row-start-1 text-right pr-8 lg:pr-12'">
          <template v-if="i % 2 === 0">
            <p class="text-secondary-font font-bold">{{ e.years }}</p>
          </template>
          <template v-else>
            <h4 class="text-primary-font font-bold">{{ e.section }}</h4>
            <p class="text-primary-font text-base">{{ e.location }}</p>
            <p class="text-primary-font mt-2">{{ e.description }}</p>
          </template>
        </div>
        <span class="absolute left-1/2 top-2 -translate-x-1/2 size-3 rounded-full ring-4 ring-white"
          :style="{ backgroundColor: e.color === 'primary' ? 'var(--color-primary)' : 'var(--color-primary-font)' }"
          aria-hidden="true"></span>
      </li>
    </ol>
  </div>
</template>

<script setup>
const experience = [
  {
    color: 'primaryFont',
    image: '/services/e2e.svg',
    years: '2021 - 2023',
    section: 'QA tester',
    location: 'Brain Industries s.r.o, Bratislava',
    description: 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs.\n' +
      'The passage is attributed to an unknown typesetter in the 15th century who is thought to have.',
  },
  {
    color: 'primary',
    image: '/services/devops.svg',
    years: '2024 - now',
    section: 'DevOps',
    location: 'Tasartir s.r.o, Bratislava',
    description: 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs.\n' +
      'The passage is attributed to an unknown typesetter in the 15th century who is thought to have.',
  },
]
</script>
