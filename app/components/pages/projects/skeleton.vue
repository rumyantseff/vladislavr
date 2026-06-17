<template>
  <div class="w-full h-full bg-brand-950 p-4 sm:p-6 lg:p-10 pt-0! sm:pt-0! lg:pt-0!
              lg:overflow-hidden
              flex flex-col gap-3 sm:gap-4 lg:gap-6 animate-pulse">

    <div class="h-12 sm:h-16 lg:h-20 xl:h-24 rounded-2xl bg-white/5 shrink-0" />

    <div class="flex-1 min-h-0 flex flex-col gap-3 lg:gap-5">

      <div class="lg:hidden flex-1 min-h-0 flex flex-col gap-3">
        <div v-for="i in 3" :key="i" class="flex-1 min-h-0 w-full rounded-xl bg-white/5" />
      </div>

      <template v-for="r in 2" :key="r">
        <div class="hidden lg:flex flex-1 min-h-0 gap-5">
          <div v-for="c in 3" :key="c" class="flex-1 basis-0 rounded-2xl bg-white/5" />
        </div>
      </template>
    </div>
  </div>
</template>
