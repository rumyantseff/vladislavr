<template>
  <div :class="[
        'group relative z-0 hover:z-10 bg-brand-50 hover:bg-brand-950',
        'text-primary-font hover:text-tertiary-font',
        'rounded-xl lg:rounded-2xl p-3 sm:p-4 lg:p-8 pb-10 sm:pb-12 lg:pb-16',
        'min-h-24 sm:min-h-28 lg:min-h-36',
        'transition-all duration-500 ease-out transform-gpu',
        'hover:shadow-2xl cursor-pointer overflow-hidden',
        'hover:scale-y-[1.12]',
        direction === 'up'
          ? 'origin-bottom hover:-translate-y-1'
          : 'origin-bottom lg:origin-top hover:-translate-y-1 lg:hover:translate-y-1',
      ]">
    <!-- Watermark initials, only on hover -->
    <span v-if="initials"
      :class="[
        'pointer-events-none select-none absolute -top-4 -left-2 lg:-top-6 lg:-left-3',
        'text-[7rem] lg:text-[10rem] xl:text-[12rem] leading-none font-bold',
        'text-tertiary-font/5',
        'opacity-0 group-hover:opacity-100',
        'transition-all duration-500',
        direction === 'up' ? 'origin-bottom' : 'origin-bottom lg:origin-top',
        'group-hover:scale-y-[0.893]',
      ]">
      {{ initials }}
    </span>

    <div :class="[
          'relative transition-transform duration-500 ease-out',
          direction === 'up' ? 'origin-bottom' : 'origin-bottom lg:origin-top',
          'group-hover:scale-y-[0.893]',
        ]">
      <h3 class="text-sm sm:text-base lg:text-xl font-semibold mb-1.5 sm:mb-2 lg:mb-3">{{ title }}</h3>
      <p class="text-xs sm:text-sm lg:text-base opacity-70 leading-relaxed">{{ description }}</p>
    </div>

    <div :class="[
          'absolute bottom-2 right-2 sm:bottom-3 sm:right-3 lg:bottom-6 lg:right-6',
          'size-7 sm:size-8 lg:size-10 rounded-md lg:rounded-lg flex items-center justify-center',
          'bg-transparent group-hover:bg-tertiary-font',
          'text-current group-hover:text-brand-950',
          'transition-all duration-500 ease-out',
          direction === 'up' ? 'origin-bottom-right' : 'origin-bottom-right lg:origin-top-right',
          'group-hover:scale-y-[0.893]',
        ]">
      <AppIconsArrowUpRight class="size-3.5 sm:size-4 lg:size-5" />
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: { type: String, required: true },
  description: { type: String, required: true },
  initials: { type: String, default: '' },
  direction: { type: String, default: 'down' },
})
</script>
