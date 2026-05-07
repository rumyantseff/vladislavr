// import this after install `@mdi/font` package
import '@mdi/font/css/materialdesignicons.css'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components' 
import * as directives from 'vuetify/directives' 
import colors from 'vuetify/util/colors'

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    ssr: true,
    components,
    directives,
    theme: {
      themes: {
        light: {
          dark: false,
          colors: {
            // background: "#ffffff",
            // primary: "#b0e363",
            // secondary: "#e4f6ca",
            // accent: "#3e7e15",

            primary: '#CBE86B',
            secondary: '#F2E9E1',
            blacker: '#1C140D',

            error: "#ef5350",

            primaryFont: "#2e384d",
            secondaryFont: "#8798ad",
            tertiaryFont: "#ffffff",
          }
        },
      },
    },
  })
  nuxtApp.vueApp.use(vuetify)
})
