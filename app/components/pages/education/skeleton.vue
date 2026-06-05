<template>
  <div class="w-full h-full bg-brand-950 p-4 sm:p-6 lg:p-10 pt-0! sm:pt-0! lg:pt-0!
              flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-6 animate-pulse">
    <!-- Mobile: horizontal marquee placeholder -->
    <div class="sm:hidden h-12 rounded-2xl bg-white/5 shrink-0" />

    <!-- Desktop: vertical marquee placeholder (left) -->
    <div class="hidden sm:block w-12 lg:w-20 xl:w-24 shrink-0">
      <div class="h-full rounded-2xl bg-white/5" />
    </div>

    <!-- Rows -->
    <div class="flex-1 min-h-0 flex flex-col divide-y divide-white/10">
      <div v-for="i in 4" :key="i" class="flex-1 min-h-0 flex items-center gap-4 lg:gap-8 py-4 lg:py-6">
        <div class="shrink-0 w-6 lg:w-8 h-4 rounded bg-white/5" />
        <div class="flex-1 h-6 lg:h-9 rounded-lg bg-white/5" />
        <div class="hidden md:block shrink-0 w-48 lg:w-64 h-3 rounded bg-white/5" />
        <div class="shrink-0 w-[4.5rem] lg:w-[5.5rem] h-8 lg:h-9 rounded-full bg-white/5" />
      </div>
    </div>
  </div>
</template>
