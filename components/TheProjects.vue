<template>
    <div 
    class="pt-4 py-lg-16 d-flex align-center mx-lg-0 mx-4">
        <v-container>
            <div class="text-center">
                <h2 class="text-primaryFont text-wrap font-weight-bold text-lg-h text-center">Created Projects</h2>
                <p class="text-secondaryFont text-wrap text-center mt-2">The projects made with creative idea.</p>
            </div>
            <v-row class="rounded-xl mx-0 mt-8 pa-2" style="box-shadow: rgba(46, 56, 77, 0.1) 0px 10px 50px;">
                <v-col v-for="(website, i) in portfolio" :key="i" cols="12" lg="4" md="6">
                    <v-sheet
                    class="rounded-xl"
                    max-width="380"
                    flat>
                        <v-img
                        class="align-end text-white rounded-xl"
                        height="216"
                        :src="website.image"
                        style="box-shadow: 0 23px 45px -11px rgba(46, 56, 77,.25) !important;"
                        cover >
                        <div class="project-status">
                            {{ website.status }}
                        </div>
                    </v-img>
                        <v-chip 
                        v-for="(technology, i) in website.technologies" :key="i" 
                        size="small" class="text-primaryFont me-1 mt-4" variant="outlined">
                            {{ technology.title }}
                        </v-chip>
                        <v-card-text class="pl-0">
                            <h3 class="text-primaryFont mb-3 font-weight-bold text-wrap">{{ website.title }}</h3>
                            <p class="text-secondaryFont text-wrap">{{ website.description }}</p>
                        </v-card-text>                      
                        <v-card-actions class="pl-0">
                            <v-btn
                            class="rounded-lg"
                            color="primaryFont"
                            text="View Project"
                            variant="flat"
                            ></v-btn>
                        </v-card-actions>
                    </v-sheet>
                </v-col>            
            </v-row>
        </v-container> 
    </div>
</template>

<script>
export default {
    data: () => ({
        portfolio: [
            {
                image: '/portfolio/mbrosia.svg',
                title: 'Musix',
                description: 'Classic audio player made by VUE.JS with own design. Made with VUE and Vuetify.',
                visitSite: 'https://musix-audio.netlify.app',
                technologies: [
                    {
                        title: 'Vue.js',
                    },
                    {
                        title: 'Vuetify',
                    },
                ],
                status: 'Done',
            },
            {
                image: '/portfolio/triangle.svg',
                title: 'Triangle Breathe',
                description: '5 Seconds breathe triangle app. Improve you breathing. Made with VUE and Vuetify.',
                visitSite: 'https://musix-audio.netlify.app',
                technologies: [
                    {
                        title: 'Vue.js',
                    },
                    {
                        title: 'Vuetify',
                    },
                    {
                        title: 'CSS',
                    },
                ],
                status: 'Done',  
            },
            {
                image: '/portfolio/mbrosia.svg',
                title: 'Musix',
                description: 'Classic audio player made by VUE.JS with own design. Made with VUE and Vuetify.',
                visitSite: 'https://musix-audio.netlify.app',
                technologies: [
                    {
                        title: 'Vue.js',
                    },
                    {
                        title: 'Vuetify',
                    },
                ],
                status: 'In Progress',
            },
        ]
    }),
}
</script>

<style>
.project-status {
    background: linear-gradient(90deg,rgb(var(--v-theme-primary)) 0,rgb(var(--v-theme-accent)));
    border-radius: 10px 100px / 120px;
    display: inline-block;
    padding: 10px;
    position: absolute;
    right: -3px;
    text-align: center;
    top: 0px;
}
.status-done {
    background: linear-gradient(90deg, #8798ad 0, #2e384d);
    border-radius: 10px 100px / 120px;
    display: inline-block;
    padding: 10px;
    position: absolute;
    right: -3px;
    text-align: center;
    top: 0px;
}
</style>