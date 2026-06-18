import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: ['@vueuse/motion/nuxt', '@nuxt/fonts', '@pinia/nuxt'],

  runtimeConfig: {
    public: {
      // Web3Forms access key — empty by default (form shows a success placeholder and does
      // not actually send). Set NUXT_PUBLIC_WEB3FORMS_KEY in .env to enable real sending.
      web3formsKey: '',
    },
  },

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
