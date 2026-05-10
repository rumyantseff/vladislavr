<template>
  <div class="w-full h-full p-4 sm:p-6 lg:p-10 pt-0! sm:pt-0! lg:pt-0!
              lg:overflow-hidden
              flex flex-col gap-6 lg:gap-8
              animate-pulse">
    <!-- Marquee placeholder -->
    <div class="grid grid-cols-2 gap-4 py-2 lg:py-4">
      <div class="h-12 sm:h-16 lg:h-20 xl:h-24 rounded-2xl bg-brand-50" />
      <div class="h-12 sm:h-16 lg:h-20 xl:h-24 rounded-2xl bg-brand-50" />
    </div>

    <!-- Intro + services placeholder -->
    <div class="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
      <!-- Intro skeleton (left) -->
      <div class="flex flex-col gap-6 lg:gap-8">
        <div class="flex flex-col gap-3">
          <div class="h-10 sm:h-12 lg:h-14 w-full rounded-xl bg-brand-50" />
          <div class="h-10 sm:h-12 lg:h-14 w-11/12 rounded-xl bg-brand-50" />
        </div>
        <div class="flex flex-col gap-2 max-w-md">
          <div class="h-3 lg:h-4 w-full rounded-full bg-brand-50" />
          <div class="h-3 lg:h-4 w-11/12 rounded-full bg-brand-50" />
          <div class="h-3 lg:h-4 w-4/5 rounded-full bg-brand-50" />
        </div>
        <div class="h-12 w-36 rounded-full bg-brand-50" />
      </div>

      <!-- Services 2x2 grid skeleton (right) -->
      <!-- Mobile carousel -->
      <div class="sm:hidden -mx-4 overflow-hidden">
        <div class="flex gap-3 px-4">
          <div v-for="i in 4" :key="i"
            class="shrink-0 w-[calc(50%-0.375rem)] min-h-24 rounded-xl bg-brand-50" />
        </div>
      </div>
      <!-- Desktop bento -->
      <div class="hidden sm:grid grid-cols-12 gap-3 lg:gap-6 auto-rows-min">
        <div class="col-span-7 min-h-28 lg:min-h-36 rounded-xl lg:rounded-2xl bg-brand-50" />
        <div class="col-span-5 min-h-28 lg:min-h-36 rounded-xl lg:rounded-2xl bg-brand-50" />
        <div class="col-span-5 min-h-28 lg:min-h-36 rounded-xl lg:rounded-2xl bg-brand-50" />
        <div class="col-span-7 min-h-28 lg:min-h-36 rounded-xl lg:rounded-2xl bg-brand-50" />
      </div>
    </div>
  </div>
</template>
