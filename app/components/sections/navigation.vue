<template>
  <AppPillBubble
    v-motion
    :initial="{ opacity: 0, y: -30 }"
    :enter="{ opacity: 1, y: 0, transition: { duration: 600, delay: 100 } }"
    class="w-full flex items-center gap-2 lg:gap-4 py-2! px-4! lg:px-6!">
    <AppLogo class="shrink-0" />
    <nav class="flex-1 hidden md:flex items-center justify-center gap-1 lg:gap-2">
      <AppNavLink v-for="(link, i) in links" :key="i" :text="link.text" :to="link.to" />
    </nav>
    <div class="flex-1 md:hidden"></div>
    <button type="button"
      class="shrink-0 hidden sm:inline-flex items-center bg-brand-500 hover:bg-brand-600 text-primary-font font-medium px-4 lg:px-6 py-2 rounded-full transition text-sm lg:text-base">
      Hire Me
    </button>
    <button type="button" aria-label="Open menu"
      class="md:hidden shrink-0 inline-flex items-center justify-center size-10 rounded-full text-primary-font hover:bg-brand-100 transition">
      <AppIconsBars3 class="size-6" />
    </button>
  </AppPillBubble>
</template>

<script setup>
const links = [
  { text: 'Home', to: '/' },
  { text: 'About', to: '/about' },
  { text: 'Projects', to: '/projects' },
  { text: 'Contact', to: '#' },
]
</script>
