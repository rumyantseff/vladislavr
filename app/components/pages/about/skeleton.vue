<template>
  <div class="w-full h-full bg-brand-950 p-4 sm:p-6 lg:p-10 pt-0! sm:pt-0! lg:pt-0!
              lg:overflow-hidden
              flex flex-col lg:flex-row gap-3 lg:gap-6
              animate-pulse">

    <div class="lg:hidden h-12 sm:h-16 rounded-2xl bg-white/5 shrink-0" />

    <div class="hidden lg:block w-12 lg:w-20 xl:w-24 shrink-0">
      <div class="h-full rounded-2xl bg-white/5" />
    </div>

    <div class="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-2">

      <div class="relative lg:col-span-1 overflow-hidden rounded-2xl lg:rounded-3xl
                  bg-white/5 p-3 lg:p-8 flex flex-col justify-between gap-6">
        <div class="flex flex-col gap-2">
          <div class="h-7 sm:h-9 lg:h-12 w-32 lg:w-48 rounded-xl bg-white/10" />
          <div class="h-7 sm:h-9 lg:h-12 w-20 lg:w-28 rounded-xl bg-white/10" />
        </div>
        <div class="flex flex-col gap-2 w-full max-w-sm">
          <div class="h-3 lg:h-4 w-full rounded-full bg-white/10" />
          <div class="h-3 lg:h-4 w-11/12 rounded-full bg-white/10" />
          <div class="h-3 lg:h-4 w-3/4 rounded-full bg-white/10" />
        </div>
      </div>

      <div class="lg:col-span-2 flex flex-col gap-3 lg:gap-0">

        <div class="lg:hidden h-12 sm:h-16 rounded-2xl bg-white/5" />

        <div class="lg:hidden flex gap-3 overflow-hidden">
          <div v-for="i in 2" :key="i"
            class="shrink-0 w-[calc(50%-0.375rem)] min-h-28 rounded-xl bg-white/5" />
        </div>

        <div class="hidden lg:grid h-full grid-cols-12 grid-rows-2 gap-3 lg:gap-2 auto-rows-fr">
          <div class="col-span-7 rounded-xl lg:rounded-2xl bg-white/5" />
          <div class="col-span-5 rounded-xl lg:rounded-2xl bg-white/5" />
          <div class="col-span-5 rounded-xl lg:rounded-2xl bg-white/5" />
          <div class="col-span-7 rounded-xl lg:rounded-2xl bg-white/5" />
        </div>
      </div>
    </div>

    <div class="hidden lg:block w-12 lg:w-20 xl:w-24 shrink-0">
      <div class="h-full rounded-2xl bg-white/5" />
    </div>
  </div>
</template>
