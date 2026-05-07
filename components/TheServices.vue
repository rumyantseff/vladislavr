<template>
    <div 
    class="pt-4 py-lg-16 d-flex align-center mx-lg-0 mx-4">
        <v-container>
            <div class="text-center">
                <h2 class="text-primaryFont text-wrap font-weight-bold text-lg-h text-center">Services</h2>
                <p class="text-secondaryFont text-wrap text-center mt-2">Here You can see the list of services.</p>
            </div>
            <v-row class="mt-16 mx-0">
                <v-col class="px-0" cols="12" lg="4" sm="6">
                    <h4 class="text-primaryFont text-wrap font-weight-bold text-lg-h3 text-h4">
                        Provision of <span class="text-primary">Services</span>
                    </h4>
                    <p class="mt-8 text-primaryFont text-wrap">
                        List of services for every desire and in different IT areas.
                        The opportunity not only to build a new project from scratch, but also to add to the existing one.
                        I'm oriented on different parts of technology world.
                    </p>
                </v-col>
                <v-col cols="12" lg="2"></v-col>
                <v-col cols="12" lg="5" sm="6">
                    <template v-for="(service, i) in services" :key="i">
                        <v-hover v-slot="{ isHovering, props }">
                            <v-card
                            :class="{ 'on-hover': isHovering }"
                            class="mx-auto mb-lg-8 mb-4 py-3 px-2 rounded-xl"
                            :color="isHovering ? 'primary' : undefined"
                            v-bind="props"
                            style="box-shadow: 0 23px 45px -11px rgba(46, 56, 77,.25) !important;"
                            flat>
                                <template v-slot:prepend>
                                    <v-img
                                    class="rounded"
                                    width="32"
                                    :src="service.image"
                                    cover />
                                </template>
                                <template v-slot:title>
                                    <h5 class="text-primaryFont font-weight-bold mx-4 text-wrap">{{ service.title }}</h5>
                                </template>
                                <template v-slot:subtitle>
                                    <p class="text-primaryFont mx-4 mt-2 text-wrap">{{ service.description }}</p>
                                </template>
                            </v-card>
                        </v-hover>
                    </template>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
export default {
    data: () => ({        
        services: [
            {
                title: 'DevOps',
                description: 'Solutions for the needs.',
                image: '/services/devops.svg',                        
            },  
            {
                title: 'Frontend / Backend Development',
                description: 'Extraordinary solutions for your needs.',
                image: '/services/frontend.svg',                            
            },  
            {
                title: 'UX/UI',
                description: 'Checking your applications work correcrly.',
                image: '/services/e2e.svg',                           
            },    
            {
                title: 'End-to-End Testing',
                description: 'Checking your applications work correcrly.',
                image: '/services/e2e.svg',                           
            },                   
        ]
    }),

    methods: {

    },
}
</script>

<style>

</style>