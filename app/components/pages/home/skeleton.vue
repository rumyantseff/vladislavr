<template>
  <div class="w-full h-full bg-brand-950 p-4 sm:p-6 lg:p-10 pt-0! sm:pt-0! lg:pt-0!
              overflow-hidden
              grid gap-3 sm:gap-4 lg:gap-10
              grid-cols-12 grid-rows-[auto_1fr_auto]
              animate-pulse">
    <!-- Info card placeholder (top-right) -->
    <div class="hidden lg:block lg:col-span-5 lg:col-start-8 lg:row-start-1 justify-self-end
                w-52 lg:w-68 aspect-[3/4] rounded-3xl bg-white/5" />

    <!-- Name placeholder (bottom-left) -->
    <div class="col-span-12 lg:col-span-7 lg:col-start-1 lg:row-start-3 self-end flex flex-col gap-2 lg:gap-3">
      <div class="h-10 sm:h-14 lg:h-20 xl:h-24 w-40 sm:w-52 lg:w-64 rounded-2xl bg-white/5" />
      <div class="h-10 sm:h-14 lg:h-20 xl:h-24 w-64 sm:w-80 lg:w-[28rem] rounded-2xl bg-white/5" />
    </div>

    <!-- Welcome text placeholder (bottom-right) -->
    <div class="hidden lg:flex lg:col-span-5 lg:col-start-8 lg:row-start-3 self-end
                flex-col items-end gap-2 w-full">
      <div class="h-4 lg:h-5 rounded-full bg-white/5 w-full" />
      <div class="h-4 lg:h-5 rounded-full bg-white/5 w-11/12" />
      <div class="h-4 lg:h-5 rounded-full bg-white/5 w-4/5" />
      <div class="h-4 lg:h-5 rounded-full bg-white/5 w-2/3" />
    </div>
  </div>
</template>
