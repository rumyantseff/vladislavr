<template>
  <div>
    <h3 class="text-secondary-font flex items-center gap-2 mt-8">
      <AppIconsAcademicCap class="size-6" />
      Education
    </h3>
    <div class="grid grid-cols-1 xl:grid-cols-12 gap-4">
      <div class="xl:col-span-7">
        <div v-for="(e, i) in education" :key="i"
          class="my-4 lg:my-8 py-10 px-8 flex gap-4 rounded-xl bg-white"
          style="box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px;">
          <div class="shrink-0">
            <img :src="e.image" :alt="e.section" class="w-15" />
          </div>
          <div>
            <p class="text-primary-font font-bold text-sm">{{ e.years }}</p>
            <h4 class="text-primary-font font-bold text-lg mt-1">{{ e.section }}</h4>
            <p class="text-primary-font text-sm mt-1">{{ e.location }}</p>
            <p class="text-primary-font mt-2 max-w-239">{{ e.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const education = [
  {
    image: '/services/e2e.svg',
    years: '2017 - 2020',
    section: 'Computer Networks',
    location: 'Secondary School of Electrical Engineering, Bratislava',
    description: 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs.\n' +
      'The passage is attributed to an unknown typesetter in the 15th century who is thought to have.',
  },
  {
    image: '/services/e2e.svg',
    years: '2020',
    section: 'Python Programming, Computer Technologies',
    location: 'CN Group, Bratislava',
    description: 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs.\n' +
      'The passage is attributed to an unknown typesetter in the 15th century who is thought to have.',
  },
]
</script>
