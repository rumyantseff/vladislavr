<template>
  <a :href="link" target="_blank" rel="noopener"
    class="group relative block rounded-xl lg:rounded-2xl h-full cursor-pointer">
    <!-- visual layer carries the real hole punched by a radial mask -->
    <div class="card-cut absolute inset-0 rounded-xl lg:rounded-2xl overflow-hidden">
      <img :src="image" :alt="title"
        class="absolute inset-0 w-full h-full object-cover
               transition-transform duration-500 ease-out
               group-hover:scale-105" />

      <div class="absolute inset-0
                  bg-brand-950/45 backdrop-blur-[3px]
                  mask-[linear-gradient(to_top,black_0%,black_25%,transparent_90%)]
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
        <h3 class="text-tertiary-font font-semibold text-sm lg:text-lg leading-tight pr-16 lg:pr-20">
          {{ title }}
        </h3>
      </div>
    </div>

    <!-- arrow button: sits inside the punched hole -->
    <div class="absolute bottom-1.5 right-1.5 lg:bottom-2 lg:right-2
                size-12 lg:size-14 rounded-full
                brand-gradient flex items-center justify-center
                transition-transform duration-300 ease-out
                group-hover:scale-105">
      <SharedIconsArrowUpRight class="size-5 lg:size-6 text-brand-950" />
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

<style scoped>
/* Real circular hole in the bottom-right corner via a single radial-gradient mask
   (no mask-composite — reliable everywhere). Big enough to clear the round button. */
.card-cut {
  -webkit-mask-image: radial-gradient(circle 38px at calc(100% - 30px) calc(100% - 30px),
    transparent 37px, black 38px);
          mask-image: radial-gradient(circle 38px at calc(100% - 30px) calc(100% - 30px),
    transparent 37px, black 38px);
}

@media (min-width: 1024px) {
  .card-cut {
    -webkit-mask-image: radial-gradient(circle 46px at calc(100% - 36px) calc(100% - 36px),
      transparent 45px, black 46px);
            mask-image: radial-gradient(circle 46px at calc(100% - 36px) calc(100% - 36px),
      transparent 45px, black 46px);
  }
}
</style>
