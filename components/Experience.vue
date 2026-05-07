<template>
  <h3 class="text-secondaryFont">
    <v-icon class="mr-2">mdi-briefcase</v-icon>
    Experience
  </h3>
  <!-- <v-card
  class="mx-0 mx-lg-n3 my-lg-8 my-4 py-10 px-lg-8 d-flex rounded-xl" flat
  style="box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px;"> -->
    <v-timeline class="align-center mx-0 mx-lg-n3 my-lg-8 my-4 py-10 px-lg-8">
      <v-timeline-item
        v-for="(e, i) in experience" 
        :key="i"
        :dot-color="e.color"
        size="small">
        <template v-slot:opposite>
          <v-card-subtitle class="text-secondaryFont font-weight-bold">{{ e.years }}</v-card-subtitle>
        </template>
        <div class="">
          <v-card-title class="text-primaryFont font-weight-bold">{{ e.section }}</v-card-title>
          <v-card-subtitle class="text-primaryFont text-body-1 text-wrap">{{ e.location }}</v-card-subtitle>
          <v-card-text class="text-primaryFont">{{ e.description }}</v-card-text>
        </div>
      </v-timeline-item>
    </v-timeline>
  <!-- </v-card> -->
</template>

<script>
export default {
  data: () => ({
    experience: [
      {
        color: 'primaryFont',
        image: '/services/e2e.svg',
        years: '2021 - 2023',
        section: 'QA tester',
        location: 'Brain Industries s.r.o, Bratislava',      
        description: 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs.\n' +
            'The passage is attributed to an unknown typesetter in the 15th century who is thought to have.',
      },
      {
        color: 'primary',
        image: '/services/devops.svg',
        years: '2024 - now',
        section: 'DevOps',
        location: 'Tasartir s.r.o, Bratislava',     
        description: 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs.\n' +
            'The passage is attributed to an unknown typesetter in the 15th century who is thought to have.',
      },
    ]
  }),
}
</script>

<style>

</style>