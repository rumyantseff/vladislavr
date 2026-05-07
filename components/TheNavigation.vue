<template>
  <!-- <div class="mb-16 mx-6" flat>
    <v-container>
      <v-app-bar opacity="0.25" style="backdrop-filter: blur(7px); background-color: rgb(255, 255, 255,.75);" elevate-on-scroll flat class="py-lg-4 px-lg-16 px-4">
        <Logo />
        <v-spacer></v-spacer>
        <div class="hidden-md-and-down">
          <v-btn v-for="q in quickLinks" class="text-primaryFont font-weight-medium text-body-1" size="x-large">
            <template v-slot:prepend>
              <v-icon :icon="q.icon" class="text-primaryFont"></v-icon>
            </template>
            {{ q.text }}
          </v-btn>
        </div>
        <v-spacer></v-spacer>
        <div>
          <v-btn rounded="lg" size="x-large" variant="flat" color="primary" class="text-primaryFont hidden-md-and-down">
            Hire Me
          </v-btn>
        </div>
        <v-app-bar-nav-icon class="text-primaryFont mx-0 hidden-md-and-up" variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      </v-app-bar>
      <v-navigation-drawer
        v-model="drawer" class="text-primaryFont secondary font-weight-bold rounded-b-xl"
        :location="$vuetify.display.mobile ? 'top' : undefined"
        elevation="0" width="320" temporary>
        <v-list lines="two">
          <v-list-subheader class="text-secondaryFonts text-overline">Menu</v-list-subheader>
          <v-list-item v-for="(item, i) in items" :key="i"
            :value="item" color="primary">
            <template v-slot:prepend>
              <v-icon :icon="item.icon" class="text-primaryFont"></v-icon>
            </template>
            <v-list-item-title class="text-primaryFont font-weight-bold" v-text="item.title"></v-list-item-title>
          </v-list-item>
          <v-list-item class="text-center">
            <v-btn
            class="text-primaryFont"
            color="primary"
            rounded="lg"
            size="x-large"
            flat>
            Hire Me                           
            </v-btn>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-container>
  </div> -->

  <div>
    <v-toolbar flat>
      <v-app-bar 
      opacity="0.25" 
      style="backdrop-filter: blur(7px); background-color: rgb(255, 255, 255,.75);" 
      elevate-on-scroll 
      flat class="py-lg-4 px-4">
        <v-container class="fill-height">
          <!-- <v-toolbar-title> -->
            <Logo />
          <!-- </v-toolbar-title> -->
          <v-spacer></v-spacer>
          <div class="hidden-md-and-down">
            <v-btn v-for="q in quickLinks" class="text-primaryFont font-weight-medium text-body-1" size="x-large">
              <template v-slot:prepend>
                <v-icon :icon="q.icon" class="text-primaryFont"></v-icon>
              </template>
              {{ q.text }}
            </v-btn>
          </div>
          <v-spacer></v-spacer>
          <v-btn
            class="bg-primary text-primaryFont"
            rounded="lg"
            size="large"
            flat>
            Hire Me                           
          </v-btn>
          <v-app-bar-nav-icon class="text-primaryFont mx-0 hidden-md-and-up" variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        </v-container>       
      </v-app-bar>

      <!-- Mobile nav -->
      <v-navigation-drawer
        v-model="drawer" class="text-primaryFont secondary font-weight-bold rounded-b-xl"
        :location="$vuetify.display.mobile ? 'top' : undefined"
        elevation="0" width="320" temporary>
        <v-list lines="two">
          <v-list-subheader class="text-secondaryFonts text-overline">Menu</v-list-subheader>
          <v-list-item v-for="(item, i) in items" :key="i"
            :value="item" color="primary">
            <template v-slot:prepend>
              <v-icon :icon="item.icon" class="text-primaryFont"></v-icon>
            </template>
            <v-list-item-title class="text-primaryFont font-weight-bold" v-text="item.title"></v-list-item-title>
          </v-list-item>
          <v-list-item class="text-center">
            <v-btn
            class="text-primaryFont"
            color="primary"
            rounded="lg"
            size="large"
            flat>
            Hire Me                           
            </v-btn>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-toolbar>
  </div>
</template>

<script>
export default {
  data: () => ({
    drawer: false,
    group: null,
    quickLinks: [
      {
        text: 'Home',
        icon: 'mdi-briefcase-outline'
      },
      {
        text: 'About',
        icon: 'mdi-information-outline',
      },
      {
        text: 'Contact',
        icon: 'mdi-account-box-outline',
      },
    ],
    items: [
      {
        title: 'Portfolio',
        icon: 'mdi-briefcase-outline',
        value: 'portfolio',
      },
      {
        title: 'About',
        icon: 'mdi-information-outline',
        value: 'about',
      },
      {
        title: 'Contact',
        icon: 'mdi-account-box-outline',
        value: 'contact',
      },
    ],
  }),

  watch: {
    group () {
      this.drawer = false
    },
  },
}
</script>

<style>
.contact-btn {
  background-image: linear-gradient(to right bottom, #2f4858, #007080, #009b8f, #4bc281, #b0e363);
}
</style>