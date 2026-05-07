<template>
    <div 
    class="pt-4 pt-lg-16 d-flex align-center">
        <v-container>
            <v-card-text class="text-center">
                <v-card-title class="text-primaryFont text-wrap font-weight-bold text-lg-h3 text-h4">
                    Do You have any <span class="text-primary">Issues</span>? Let's talk about them.
                </v-card-title>
            </v-card-text>
            <v-card
            class="mx-0 mx-lg-n3 my-lg-16 my-8 py-10 px-8 rounded-xl" flat
            style="box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px;">
                <v-row>
                    <v-col lg="4">
                        <div class="align-center d-flex mb-8" v-for="(c, i) in contacts" :key="i">
                            <div>
                                <v-img
                                class="rounded-lg mx-aut"
                                width="50"
                                :src="c.image"
                                cover />
                            </div>
                            <div class="align-center">
                                <v-card-title class="text-primaryFont py-0">{{ c.title }}</v-card-title>
                                <v-card-subtitle class="text-primaryFont">{{ c.subtitle }}</v-card-subtitle>
                            </div>
                        </div>
                    </v-col>
                    <v-col class="" lg="8">
                        <v-form>
                            <v-row>
                                <v-col cols="12" lg="6">
                                    <v-text-field
                                    bg-color="primary-light"
                                    base-color="primary"
                                    rounded="lg"
                                    placeholder="Your name"
                                    variant="outlined"
                                    hide-details="auto">
                                    </v-text-field>
                                </v-col>
                                <v-col cols="12" lg="6">
                                    <v-text-field
                                    bg-color="primary-light"
                                    base-color="primary"
                                    rounded="lg"
                                    placeholder="Your Email address"
                                    variant="outlined"
                                    hide-details="auto">
                                    </v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12">
                                    <v-textarea
                                    bg-color="primary-light"
                                    base-color="primary"
                                    rounded="lg"
                                    placeholder="Write the message"
                                    variant="outlined"
                                    hide-details="auto">                                 
                                    </v-textarea>
                                </v-col>
                            </v-row>
                            <v-btn
                            class="my-12 text-primaryFont opacity-50"
                            opacity="30"
                            color="primary"
                            rounded="lg"
                            size="x-large"
                            flat>
                            Send your Message
                            <template v-slot:append>
                                <v-icon color="primaryFont">mdi-emoticon-wink</v-icon>
                            </template>
                            </v-btn>
                        </v-form>
                    </v-col>
                </v-row>
            </v-card>
        </v-container>
    </div>
</template>

<script>
export default {
  data: () => ({
    contacts: [
        {
            image: '/services/devops.svg',
            title: 'E-mail',
            subtitle: 'vladik.rumyantsev@gmail.com',
        },
        {
            image: '/services/devops.svg',
            title: 'Phone',
            subtitle: '+7 777 777',
        },
    ]
  }),
}
</script>