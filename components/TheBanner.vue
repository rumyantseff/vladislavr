<template>
  <v-card
  class="banner mx-lg- mx- rounded-x d-flex align-center" flat height="100vh">
    <v-container class="ma-lg-">
      <v-row class="align-lg-center align-end">
        <v-col cols="12">
          <h3 class="text-secondaryFont text-sm-secondaryFont font-weight-bold text-lg-h2 text-h5 mb-4 text-center">Hi!</h3>
          <h3 class="text-primaryFont font-weight-bold text-lg-h2 text-h5 text-center">I'm Vlad Rumyantsev</h3>
          <p class="text-tertiary mt-lg-8 mt-4 text-lg-body-1 text-body-2 text-center text-wrap">
              Here you can find several home projects.
          </p>
          <v-card-actions class="mx-2 justify-center">
            <v-btn class="text-tertiaryFont font-weight-bold px-8 mt-lg-8 mt-4" rounded="lg" size="x-large" variant="flat" color="primaryFont" append-icon="mdi-arrow-top-right">
            Let's Start
            </v-btn>
          </v-card-actions>
        </v-col>
        <!-- <v-col class="d-lg-flex d-none justify-end" cols="12" xl="4" lg="6" md="6">
          <v-img src="/portfolio/banner-laptop.svg" class="banner-img" height="300" />
        </v-col> -->
      </v-row>
    </v-container>
  </v-card>
</template>

<style scoped>
.banner {
  overflow: hidden;
  position: relative;
}
.banner::before {
  width: 1300px;
  height: 400px;
  content: '';
  background-image: linear-gradient(45deg, #b0e363,#b0e363, #68edcb, #13687a );
  position: absolute;
  z-index: -1;
  border-radius: 25% 5% 5% 25%;
  filter: blur(150px);
  top: 50%;
  left: 35%;
  transform: translate(-10%, -50%);
  transition: 1s;
}

.banner-img {
  transform: translate(0px);
  animation: float 7s ease-out infinite;
  
}
@keyframes float {
  0% {
    transform : translateY(0px); 
    filter: drop-shadow(0px 10px 50px rgba(46, 56, 77, 0.5));
  }
  50% {
    transform : translateY(-50px); 
    filter: drop-shadow(20px 10px 50px rgba(46, 56, 77, 0.5));
  }
  100% {
    transform : translateY(0px); 
    filter: drop-shadow(0px 10px 50px rgba(46, 56, 77, 0.5));
  }
}

@media screen and (max-width: 767px) {
  .banner::before {
    height: auto;
    overflow: hidden;
    position: absolute;
  }
  .banner::before  {
    width: 650px;
    height: 400px;
    top: 20%;
    left: 0%;
  }
}
</style>