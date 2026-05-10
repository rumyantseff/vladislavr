<template>
  <div class="w-full h-full p-4 sm:p-6 lg:p-10 pt-0! sm:pt-0! lg:pt-0!
              flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-6 animate-pulse">
    <!-- Mobile: horizontal marquee placeholder -->
    <div class="sm:hidden h-12 rounded-2xl bg-brand-50 shrink-0" />
    <!-- Cards placeholders -->
    <div class="flex-1 min-h-0">
      <div class="grid grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-5 h-full auto-rows-fr">
        <div v-for="i in 6" :key="i" class="rounded-xl bg-brand-50" />
      </div>
    </div>
    <!-- Desktop: vertical marquee placeholder -->
    <div class="hidden sm:block w-12 lg:w-20 xl:w-24 shrink-0">
      <div class="h-full rounded-2xl bg-brand-50" />
    </div>
  </div>
</template>
