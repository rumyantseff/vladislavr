<template>
  <SharedPillBubble
    v-motion
    :initial="{ opacity: 0, y: -30 }"
    :enter="{ opacity: 1, y: 0, transition: { duration: 600, delay: 100 } }"
    class="w-full flex items-center gap-2 lg:gap-4 py-1! px-2! lg:px-2!">
    <SharedLogo data-testid="nav-logo" class="shrink-0 ml-1 lg:ml-2" />
    <nav class="flex-1 hidden md:flex items-center justify-center gap-1.5 lg:gap-2">
      <SharedNavLink v-for="(link, i) in links" :key="i"
        :text="link.text" :to="link.to" :icon="link.icon"
        :active="stack.activeIndex.value === i" />
    </nav>
    <div class="flex-1 md:hidden"></div>
    <a data-testid="nav-hire-me" href="mailto:vladik.rumyantsev@gmail.com"
      class="shrink-0 hidden sm:inline-flex items-center gap-2 pl-4 pr-1 py-1 rounded-full
             brand-gradient hover:brightness-110
             text-brand-950 font-semibold text-sm lg:text-base
             transition-all duration-200">
      <span>Hire Me</span>
      <span class="size-8 lg:size-9 rounded-full bg-brand-950/15 backdrop-blur-xl border border-brand-950/20 flex items-center justify-center text-brand-950">
        <SharedIconsArrowUpRight class="size-4 lg:size-4" />
      </span>
    </a>
    <button type="button" aria-label="Open menu"
      class="md:hidden shrink-0 inline-flex items-center justify-center size-10 rounded-full text-tertiary-font hover:bg-white/10 transition">
      <SharedIconsBars3 class="size-6" />
    </button>
  </SharedPillBubble>
</template>

<script setup>
import Briefcase from '~/components/shared/icons/briefcase.vue'
import InformationCircle from '~/components/shared/icons/information-circle.vue'
import Identification from '~/components/shared/icons/identification.vue'
import FaceSmile from '~/components/shared/icons/face-smile.vue'
import AcademicCap from '~/components/shared/icons/academic-cap.vue'
import { usePageStack } from '~/composables/usePageStack'

const stack = usePageStack()

const links = [
  { text: 'Home', to: '/', icon: Briefcase },
  { text: 'About', to: '/about', icon: InformationCircle },
  { text: 'Education', to: '/education', icon: AcademicCap },
  { text: 'Projects', to: '/projects', icon: FaceSmile },
  { text: 'Contact', to: '/contact', icon: Identification },
]
</script>
