<template>
  <a :href="link"
    class="group inline-flex items-center gap-3 pr-5 lg:pr-6 pl-1.5 py-1.5
           rounded-full bg-tertiary-font/10 hover:bg-tertiary-font/20
           backdrop-blur-sm transition-colors duration-300">
    <span class="size-9 lg:size-12 rounded-full bg-brand-950 border border-tertiary-font/20
                 flex items-center justify-center text-tertiary-font
                 group-hover:translate-x-1 transition-transform duration-300">
      <AppIconsChevronDoubleRight class="size-4 lg:size-5" />
    </span>
    <span class="text-tertiary-font font-medium text-sm lg:text-lg whitespace-nowrap">{{ text }}</span>
  </a>
</template>

<script setup>
defineProps({
  text: { type: String, default: 'Hire Me Now!' },
  link: { type: String, default: '#' },
})
</script>
