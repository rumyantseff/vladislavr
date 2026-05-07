import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: ['@vueuse/motion/nuxt'],

  css: ['~/assets/main.css'],

  app: {
    head: {
      title: 'Vlad Portfolio page',
      meta: [
        { name: 'description', content: 'Portfolio page' }
      ],
      link: [
        { rel: 'shortcut icon', type: 'image/x-icon', href: 'vr.svg' },
      ],
    }
  },

  vite: {
    plugins: [tailwindcss()],
  },
})
