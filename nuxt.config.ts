import tailwindcss from '@tailwindcss/vite'

const LOCALES = ['en', 'sk', 'de', 'es']
const SLUGS: Record<string, Record<string, string>> = {
  home: { en: '', sk: '', de: '', es: '' },
  about: { en: 'about', sk: 'o-mne', de: 'ueber-mich', es: 'sobre-mi' },
  projects: { en: 'projects', sk: 'projekty', de: 'projekte', es: 'proyectos' },
  contact: { en: 'contact', sk: 'kontakt', de: 'kontakt', es: 'contacto' },
  'send-message': { en: 'send-message', sk: 'poslat-spravu', de: 'nachricht-senden', es: 'enviar-mensaje' },
}
const localizedRoutes = LOCALES.flatMap(loc =>
  Object.keys(SLUGS).map(key => {
    const slug = SLUGS[key]![loc]
    return slug ? `/${loc}/${slug}` : `/${loc}`
  }),
)

export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: ['@vueuse/motion/nuxt', '@nuxt/fonts', '@pinia/nuxt', '@nuxt/image'],

  routeRules: {
    '/': { redirect: '/en' },
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/', ...localizedRoutes],
    },
  },

  runtimeConfig: {
    public: {
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

  experimental: {
    defaults: {
      nuxtLink: {
        prefetchOn: {
          interaction: true,
          visibility: false,
        },
      },
    },
  },
})