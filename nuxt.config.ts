import tailwindcss from '@tailwindcss/vite'

// Localized routes for SSG prerendering. Kept in sync with app/i18n/routes.ts (the runtime
// source of truth); duplicated here because nuxt.config is evaluated before the app aliases
// resolve. If you add a page/locale there, mirror it here.
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

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: ['@vueuse/motion/nuxt', '@nuxt/fonts', '@pinia/nuxt'],

  // bare "/" -> default-locale home; prerender every localized page for SSG.
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
