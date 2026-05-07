<template>
  <section class="pt-4 lg:py-16 flex items-center mx-4 lg:mx-0">
    <div class="container-x">
      <div class="text-center">
        <h2 class="text-primary-font font-bold text-3xl lg:text-4xl">Services</h2>
        <p class="text-secondary-font mt-2">Here You can see the list of services.</p>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 mt-16">
        <div class="lg:col-span-4">
          <h4 class="text-primary-font font-bold text-2xl lg:text-3xl">
            Provision of <span class="text-primary">Services</span>
          </h4>
          <p class="mt-8 text-primary-font">
            List of services for every desire and in different IT areas.
            The opportunity not only to build a new project from scratch, but also to add to the existing one.
            I'm oriented on different parts of technology world.
          </p>
        </div>
        <div class="hidden lg:block lg:col-span-2"></div>
        <div class="lg:col-span-6 flex flex-col gap-4 lg:gap-8">
          <div v-for="(service, i) in services" :key="i"
            class="group flex items-start gap-4 mx-auto w-full py-3 px-2 rounded-xl bg-white hover:bg-primary transition cursor-pointer"
            style="box-shadow: 0 23px 45px -11px rgba(46, 56, 77, 0.25);">
            <img :src="service.image" :alt="service.title" class="w-8 h-8 rounded object-cover shrink-0" />
            <div class="mx-4">
              <h5 class="text-primary-font font-bold">{{ service.title }}</h5>
              <p class="text-primary-font mt-2">{{ service.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const services = [
  { title: 'DevOps', description: 'Solutions for the needs.', image: '/services/devops.svg' },
  { title: 'Frontend / Backend Development', description: 'Extraordinary solutions for your needs.', image: '/services/frontend.svg' },
  { title: 'UX/UI', description: 'Checking your applications work correcrly.', image: '/services/e2e.svg' },
  { title: 'End-to-End Testing', description: 'Checking your applications work correcrly.', image: '/services/e2e.svg' },
]
</script>
