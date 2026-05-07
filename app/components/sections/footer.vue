<template>
  <footer class="bg-primary-font text-tertiary-font flex">
    <div class="container-x px-4 lg:p-8">
      <div class="grid grid-cols-12 gap-4">
        <div class="col-span-12 lg:col-span-3">
          <div class="size-13 rounded-full overflow-hidden">
            <img src="/VladR_Logo.svg" alt="Logo" class="w-full h-full object-cover" />
          </div>
        </div>
        <div v-for="(fl, f) in footerLinks" :key="f" class="col-span-6 lg:col-span-2">
          <h3 class="mb-8 text-tertiary-font font-bold">{{ fl.title }}</h3>
          <p v-for="(st, s) in fl.subtitles" :key="s" class="mb-4 text-secondary-font font-medium">{{ st.title }}</p>
        </div>
      </div>
      <div class="grid grid-cols-12 justify-center mt-8">
        <div class="col-span-12 lg:col-span-8 lg:col-start-3 text-primary-font flex items-center justify-center flex-wrap gap-1">
          <span>Made with</span>
          <AppIconsHeart class="size-5 text-error" />
          <span>by</span>
          <br class="lg:hidden basis-full" />
          <strong class="text-tertiary-font">Vladislav Rumyantsev</strong>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
const footerLinks = [
  {
    title: 'Information',
    subtitles: [
      { title: 'Home' },
      { title: 'About' },
      { title: 'Services' },
      { title: 'Contact' },
    ],
  },
  {
    title: 'What I can do',
    subtitles: [{ title: 'Services' }],
  },
  {
    title: 'Resume',
    subtitles: [
      { title: 'Education' },
      { title: 'Experience' },
    ],
  },
  {
    title: 'Projects',
    subtitles: [
      { title: 'Musix' },
      { title: 'Breathe Triangle' },
    ],
  },
]
</script>
