<template>
  <section class="pt-4 lg:py-16 flex items-center mx-4 lg:mx-0">
    <div class="container-x">
      <div class="text-center">
        <h2 class="text-primary-font font-bold text-3xl lg:text-4xl">Created Projects</h2>
        <p class="text-secondary-font mt-2">The projects made with creative idea.</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 rounded-xl mt-8 p-2"
        style="box-shadow: rgba(46, 56, 77, 0.1) 0px 10px 50px;">
        <div v-for="(website, i) in portfolio" :key="i" class="rounded-xl max-w-95 mx-auto w-full">
          <div class="relative">
            <img :src="website.image" :alt="website.title"
              class="w-full h-54 object-cover rounded-xl"
              style="box-shadow: 0 23px 45px -11px rgba(46, 56, 77, 0.25);" />
            <div class="project-status">{{ website.status }}</div>
          </div>
          <div class="mt-4 flex flex-wrap gap-1">
            <span v-for="(technology, j) in website.technologies" :key="j"
              class="text-primary-font text-xs px-3 py-1 rounded-full border border-primary-font/30">
              {{ technology.title }}
            </span>
          </div>
          <div class="py-4">
            <h3 class="text-primary-font mb-3 font-bold">{{ website.title }}</h3>
            <p class="text-secondary-font text-sm">{{ website.description }}</p>
          </div>
          <div>
            <button type="button"
              class="rounded-lg bg-primary-font text-tertiary-font px-4 py-2 hover:opacity-90 transition">
              View Project
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const portfolio = [
  {
    image: '/portfolio/mbrosia.svg',
    title: 'Musix',
    description: 'Classic audio player made by VUE.JS with own design. Made with VUE and Vuetify.',
    visitSite: 'https://musix-audio.netlify.app',
    technologies: [{ title: 'Vue.js' }, { title: 'Vuetify' }],
    status: 'Done',
  },
  {
    image: '/portfolio/triangle.svg',
    title: 'Triangle Breathe',
    description: '5 Seconds breathe triangle app. Improve you breathing. Made with VUE and Vuetify.',
    visitSite: 'https://musix-audio.netlify.app',
    technologies: [{ title: 'Vue.js' }, { title: 'Vuetify' }, { title: 'CSS' }],
    status: 'Done',
  },
  {
    image: '/portfolio/mbrosia.svg',
    title: 'Musix',
    description: 'Classic audio player made by VUE.JS with own design. Made with VUE and Vuetify.',
    visitSite: 'https://musix-audio.netlify.app',
    technologies: [{ title: 'Vue.js' }, { title: 'Vuetify' }],
    status: 'In Progress',
  },
]
</script>

<style scoped>
.project-status {
  background: linear-gradient(90deg, var(--color-primary) 0, #4bc281);
  border-radius: 10px 100px / 120px;
  display: inline-block;
  padding: 10px;
  position: absolute;
  right: -3px;
  text-align: center;
  top: 0px;
  color: var(--color-primary-font);
  font-weight: 600;
}
</style>
