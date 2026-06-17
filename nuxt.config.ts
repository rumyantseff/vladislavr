import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: ['@vueuse/motion/nuxt', '@nuxt/fonts', '@pinia/nuxt'],

  fonts: {
    families: [
      { name: 'Sora', provider: 'google', weights: [300, 400, 500, 600, 700, 800] },
      { name: 'Archivo', provider: 'google', weights: [600, 700, 800, 900] },
    ],
  },

  css: ['~/assets/main.css'],

  app: {
    head: {
      title: 'Vlad Rumyantsev — Home',
      meta: [
        { name: 'description', content: 'Vlad Rumyantsev — IT Specialist portfolio: DevOps, Frontend, QA, Brand Design.' }
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/VladR_Logo.png' },
      ],
    }
  },

  vite: {
    plugins: [tailwindcss()],
  },
})
