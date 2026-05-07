<template>
    <v-footer
    color="primaryFont"
    class="mt- d-flex" flat>
        <v-container class="ma-lg-8">
            <v-row>
                <v-col cols="12" sm="12" md="12" lg="3">
                    <v-avatar size="52">
                        <v-img src="/VladR_Logo.svg" />
                    </v-avatar>
                </v-col>
                <v-col v-for="(fl, f) in footerLinks" :key="f" class="" cols="6" sm="6" md="6" lg="2">
                    <h3 class="mb-8 text-tertiaryFont font-weight-bold">{{ fl.title }}</h3>
                        <p v-for="(st, s) in fl.subtitles" :key="s" class="mb-4 text-secondaryFont font-weight-medium text-h">{{ st.title }}</p>                   
                </v-col>
            </v-row>
            <v-row class="justify-center">
                <v-col cols="12" lg="8" sm="12" class="text-primaryFont">
                    Made with <v-icon class="text-error">mdi-heart</v-icon> by
                    <br class="d-lg-none">
                    <strong class="text-tertiary">Vladislav Rumyantsev</strong>
                </v-col>
            </v-row>
        </v-container>
    </v-footer>
</template>

<script>
  export default {
    data: () => ({
        footerLinks: [
            {
                title: 'Information',
                subtitles: [
                    { title: 'Home' },
                    { title: 'About' },
                    { title: 'Services' },
                    { title: 'Contact' },
                ]
            },
            {
                title: 'What I can do',
                subtitles: [
                    { title: 'Services' },
                ]
            },
            {
                title: 'Resume',
                subtitles: [
                    { title: 'Education' },
                    { title: 'Experience' },
                ]
            },
            {
                title: 'Projects',
                subtitles: [
                    { title: 'Musix' },
                    { title: 'Breathe Triangle' },
                ]
            },
        ],
      icons: [
        'mdi-facebook',
        'mdi-linkedin',
        'mdi-instagram',
      ],
    }),
  }
</script>