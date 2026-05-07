<template>
  <section class="pt-4 lg:pt-16 flex items-center">
    <div class="container-x px-4">
      <div class="text-center">
        <h2 class="text-primary-font font-bold text-3xl lg:text-4xl">
          Do You have any <span class="text-primary">Issues</span>? Let's talk about them.
        </h2>
      </div>
      <div class="my-8 lg:my-16 py-10 px-8 rounded-xl bg-white"
        style="box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px;">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div class="lg:col-span-4 flex flex-col gap-8">
            <div class="flex items-center gap-4" v-for="(c, i) in contacts" :key="i">
              <img :src="c.image" :alt="c.title" class="w-12.5 h-12.5 rounded-lg object-cover shrink-0" />
              <div>
                <h3 class="text-primary-font text-lg font-medium">{{ c.title }}</h3>
                <p class="text-primary-font/70 text-sm">{{ c.subtitle }}</p>
              </div>
            </div>
          </div>
          <form class="lg:col-span-8" @submit.prevent>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <input type="text" placeholder="Your name"
                class="w-full px-4 py-3 rounded-lg border border-primary text-primary-font placeholder:text-primary/70 outline-none focus:ring-2 focus:ring-primary" />
              <input type="email" placeholder="Your Email address"
                class="w-full px-4 py-3 rounded-lg border border-primary text-primary-font placeholder:text-primary/70 outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div class="mt-4">
              <textarea placeholder="Write the message" rows="5"
                class="w-full px-4 py-3 rounded-lg border border-primary text-primary-font placeholder:text-primary/70 outline-none focus:ring-2 focus:ring-primary resize-y"></textarea>
            </div>
            <button type="submit"
              class="my-12 inline-flex items-center gap-2 bg-primary text-primary-font opacity-50 hover:opacity-100 transition px-8 py-4 rounded-lg text-lg font-medium">
              Send your Message
              <AppIconsFaceSmile class="size-5 text-primary-font" />
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const contacts = [
  { image: '/services/devops.svg', title: 'E-mail', subtitle: 'vladik.rumyantsev@gmail.com' },
  { image: '/services/devops.svg', title: 'Phone', subtitle: '+7 777 777' },
]
</script>
