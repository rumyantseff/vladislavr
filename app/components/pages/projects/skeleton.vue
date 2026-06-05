<template>
  <div class="w-full h-full bg-brand-950 p-4 sm:p-6 lg:p-10 pt-0! sm:pt-0! lg:pt-0!
              flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-6 animate-pulse">
    <!-- Mobile: horizontal marquee placeholder -->
    <div class="sm:hidden h-12 rounded-2xl bg-white/5 shrink-0" />
    <!-- Cards placeholders (mirror projects-grid: mobile 2-col, desktop 2 rows of 3) -->
    <div class="flex-1 min-h-0 flex flex-col gap-3 lg:gap-5">
      <!-- Mobile: 2-col grid -->
      <div class="lg:hidden grid grid-cols-2 gap-3 h-full auto-rows-fr">
        <div v-for="i in 6" :key="i" class="rounded-xl lg:rounded-2xl bg-white/5" />
      </div>
      <!-- Desktop: 2 flex rows of 3 -->
      <template v-for="r in 2" :key="r">
        <div class="hidden lg:flex flex-1 min-h-0 gap-5">
          <div v-for="c in 3" :key="c" class="flex-1 basis-0 rounded-2xl bg-white/5" />
        </div>
      </template>
    </div>
    <!-- Desktop: vertical marquee placeholder -->
    <div class="hidden sm:block w-12 lg:w-20 xl:w-24 shrink-0">
      <div class="h-full rounded-2xl bg-white/5" />
    </div>
  </div>
</template>
