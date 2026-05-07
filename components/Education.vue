<template>
  <h3 class="text-secondaryFont">
    <v-icon class="mr-2">mdi-school</v-icon>
    Education
  </h3>
  <v-row>
    <v-col cols="12" xl="7">
      <v-card
        v-for="(e, i) in education" :key="i"
        class="mx-0 mx-lg-n3 my-lg-8 my-4 py-10 px-8 d-flex rounded-xl" flat
        style="box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px;">
          <div>
            <v-img :src="e.image" width="60" />
          </div>
          <div class="pl-0">
            <v-card-subtitle class="text-primaryFont font-weight-bold ">{{ e.years }}</v-card-subtitle>
            <v-card-title class="text-primaryFont font-weight-bold text-wrap">{{ e.section }}</v-card-title>
            <v-card-subtitle class="text-primaryFont text-body-2 text-wrap">{{ e.location }}</v-card-subtitle>
            <v-card-text class="text-primaryFont" style="max-width: 956px;">{{ e.description }}</v-card-text>
          </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    education: [
      {
        image: '/services/e2e.svg',
        years: '2017 - 2020',
        section: 'Computer Networks',
        location: 'Secondary School of Electrical Engineering, Bratislava',
        description: 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs.\n' +
            'The passage is attributed to an unknown typesetter in the 15th century who is thought to have.',
      },
      {
        image: '/services/e2e.svg',
        years: '2020',
        section: 'Python Programming, Computer Technologies',
        location: 'CN Group, Bratislava',
        description: 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs.\n' +
            'The passage is attributed to an unknown typesetter in the 15th century who is thought to have.',
      },
    ]
  }),
}
</script>

<style>

</style>