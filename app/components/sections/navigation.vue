<template>
  <header>
    <div class="sticky top-0 z-30 backdrop-blur-md bg-white/75 py-2 lg:py-4 px-4">
      <div class="container-x flex items-center gap-4">
        <AppLogo />
        <div class="flex-1"></div>
        <nav class="hidden lg:flex items-center gap-2">
          <button v-for="(q, i) in quickLinks" :key="i" type="button"
            class="inline-flex items-center gap-2 text-primary-font font-medium text-base px-4 py-2 rounded-md hover:bg-primary-font/5 transition">
            <component :is="q.icon" class="size-5 text-primary-font" />
            {{ q.text }}
          </button>
        </nav>
        <div class="flex-1"></div>
        <button type="button"
          class="bg-primary text-primary-font font-medium px-6 py-2.5 rounded-lg hover:opacity-90 transition">
          Hire Me
        </button>
        <button type="button" @click="drawer = !drawer" aria-label="Open menu"
          class="lg:hidden text-primary-font p-2 rounded-md hover:bg-primary-font/5 transition">
          <AppIconsBars3 class="size-6" />
        </button>
      </div>
    </div>

    <!-- Mobile drawer -->
    <Transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0">
      <div v-if="drawer" class="fixed inset-0 z-40 bg-black/40 lg:hidden" @click="drawer = false" />
    </Transition>
    <Transition
      enter-active-class="transition ease-out duration-300"
      enter-from-class="-translate-y-full"
      enter-to-class="translate-y-0"
      leave-active-class="transition ease-in duration-200"
      leave-from-class="translate-y-0"
      leave-to-class="-translate-y-full">
      <aside v-if="drawer"
        class="fixed top-0 left-0 right-0 z-50 max-w-80 mx-auto bg-secondary text-primary-font font-bold rounded-b-xl lg:hidden">
        <div class="p-4">
          <p class="text-secondary-font text-xs uppercase tracking-widest mb-2">Menu</p>
          <ul>
            <li v-for="(item, i) in items" :key="i">
              <button type="button" @click="drawer = false"
                class="w-full flex items-center gap-3 px-3 py-3 rounded-md hover:bg-primary/40 transition">
                <component :is="item.icon" class="size-5 text-primary-font" />
                <span class="text-primary-font font-bold">{{ item.title }}</span>
              </button>
            </li>
            <li class="text-center mt-2">
              <button type="button"
                class="bg-primary text-primary-font px-6 py-3 rounded-lg font-medium hover:opacity-90 transition">
                Hire Me
              </button>
            </li>
          </ul>
        </div>
      </aside>
    </Transition>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import Briefcase from '~/components/app/icons/briefcase.vue'
import InformationCircle from '~/components/app/icons/information-circle.vue'
import Identification from '~/components/app/icons/identification.vue'

const drawer = ref(false)

const quickLinks = [
  { text: 'Home', icon: Briefcase },
  { text: 'About', icon: InformationCircle },
  { text: 'Contact', icon: Identification },
]

const items = [
  { title: 'Portfolio', icon: Briefcase },
  { title: 'About', icon: InformationCircle },
  { title: 'Contact', icon: Identification },
]
</script>
