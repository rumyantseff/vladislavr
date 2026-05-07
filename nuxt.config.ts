import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  css: ["~/assets/main.scss"],
  build: {
    transpile: ['vuetify'],
  },
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
  ],

  app: {
    head: {
      title: 'Vlad Portfolio page',
      meta: [
        { name: 'description', content: 'Portfolio page' }
      ],
      link: [
        { rel: 'stylesheet', href: '' },
        { rel: 'shortcut icon', type: 'image/x-icon', href: 'vr.svg' },
      ],
    }
  },

  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
})
