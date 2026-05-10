<template>
  <a :href="link" target="_blank" rel="noopener"
    class="group relative block rounded-xl lg:rounded-2xl overflow-hidden
           aspect-[4/3] bg-brand-950 cursor-pointer">
    <!-- project image -->
    <img :src="image" :alt="title"
      class="absolute inset-0 w-full h-full object-cover
             transition-transform duration-500 ease-out
             group-hover:scale-105" />

    <!-- hover overlay: chips + title -->
    <div class="absolute inset-0
                bg-gradient-to-t from-brand-950/95 via-brand-950/60 to-brand-950/0
                opacity-0 group-hover:opacity-100
                transition-opacity duration-500
                flex flex-col justify-end p-4 lg:p-6">
      <div class="flex flex-wrap gap-1.5 lg:gap-2 mb-3">
        <span v-for="t in tags" :key="t"
          class="px-3 py-1 rounded-full text-[10px] lg:text-xs font-medium
                 bg-tertiary-font/10 text-tertiary-font
                 border border-tertiary-font/30 backdrop-blur-sm">
          {{ t }}
        </span>
      </div>
      <h3 class="text-tertiary-font font-semibold text-sm lg:text-lg leading-tight pr-12 lg:pr-14">
        {{ title }}
      </h3>
    </div>

    <!-- arrow icon — slides in on hover -->
    <div class="absolute bottom-3 right-3 lg:bottom-4 lg:right-4
                size-9 lg:size-11 rounded-lg
                bg-tertiary-font flex items-center justify-center
                opacity-0 group-hover:opacity-100
                translate-y-2 group-hover:translate-y-0
                transition-all duration-500 ease-out">
      <AppIconsArrowUpRight class="size-4 lg:size-5 text-brand-950" />
    </div>
  </a>
</template>

<script setup>
defineProps({
  title: { type: String, required: true },
  tags: { type: Array, default: () => [] },
  image: { type: String, required: true },
  link: { type: String, default: '#' },
})
</script>
