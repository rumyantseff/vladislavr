<template>
  <section class="banner relative overflow-hidden flex items-center min-h-screen">
    <div class="container-x px-4">
      <div class="flex flex-col lg:items-center items-end">
        <div class="w-full">
          <h3 class="text-secondary-font font-bold text-2xl lg:text-5xl mb-4 text-center">Hi!</h3>
          <h3 class="text-primary-font font-bold text-2xl lg:text-5xl text-center">I'm Vlad Rumyantsev</h3>
          <p class="text-primary-font/70 mt-4 lg:mt-8 text-sm lg:text-base text-center text-wrap">
            Here you can find several home projects.
          </p>
          <div class="flex justify-center mx-2 mt-4 lg:mt-8">
            <button type="button"
              class="inline-flex items-center gap-2 bg-primary-font text-tertiary-font font-bold px-8 py-4 rounded-lg text-lg hover:opacity-90 transition">
              Let's Start
              <AppIconsArrowUpRight class="size-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.banner::before {
  width: 1300px;
  height: 400px;
  content: '';
  background-image: linear-gradient(45deg, #b0e363, #b0e363, #68edcb, #13687a);
  position: absolute;
  z-index: -1;
  border-radius: 25% 5% 5% 25%;
  filter: blur(150px);
  top: 50%;
  left: 35%;
  transform: translate(-10%, -50%);
  transition: 1s;
}

@media screen and (max-width: 767px) {
  .banner::before {
    width: 650px;
    height: 400px;
    top: 20%;
    left: 0%;
  }
}
</style>
