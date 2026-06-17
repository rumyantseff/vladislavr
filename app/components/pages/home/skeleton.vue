<template>
  <div class="relative w-full h-full bg-brand-950 p-4 sm:p-6 lg:p-10 pt-0! sm:pt-0! lg:pt-0!
              overflow-hidden
              grid gap-3 sm:gap-4 lg:gap-10
              grid-cols-12 grid-rows-[auto_1fr_auto]
              animate-pulse">

    <div class="absolute inset-0 z-0 flex items-start lg:items-center justify-center pointer-events-none
                pt-[18vh] lg:pt-0">
      <div class="knot-ph relative flex items-center justify-center
                  size-[42vh] lg:size-[60vh] max-w-[78vw] aspect-square">

        <div class="knot-halo absolute inset-0 rounded-full bg-white/8 blur-2xl" />

        <div class="absolute inset-0 rounded-full border-2 border-white/12 bg-white/5" />

        <div class="absolute inset-[18%] rounded-full border border-white/10" />
      </div>
    </div>

    <div class="relative z-10 hidden lg:flex lg:col-span-5 lg:col-start-8 lg:row-start-1 justify-self-end
                w-52 lg:w-68 rounded-3xl bg-white/5 p-5 lg:p-6 flex-col">
      <div class="self-end size-9 lg:size-12 rounded-full bg-white/10" />
      <div class="mt-8 flex flex-col gap-2">
        <div class="h-6 lg:h-7 w-full rounded-lg bg-white/10" />
        <div class="h-6 lg:h-7 w-2/3 rounded-lg bg-white/10" />
      </div>
    </div>

    <div class="relative z-10 col-span-12 lg:col-span-7 lg:col-start-1 lg:row-start-3 self-end flex flex-col gap-2 lg:gap-3">
      <div class="h-10 sm:h-14 lg:h-20 xl:h-24 w-40 sm:w-52 lg:w-64 rounded-2xl bg-white/5" />
      <div class="h-10 sm:h-14 lg:h-20 xl:h-24 w-64 sm:w-80 lg:w-md rounded-2xl bg-white/5" />
    </div>

    <div class="relative z-10 hidden lg:flex lg:col-span-5 lg:col-start-8 lg:row-start-3 self-end
                flex-col items-end gap-2 w-full">
      <div class="h-4 lg:h-5 rounded-full bg-white/5 w-full" />
      <div class="h-4 lg:h-5 rounded-full bg-white/5 w-11/12" />
      <div class="h-4 lg:h-5 rounded-full bg-white/5 w-4/5" />
      <div class="h-4 lg:h-5 rounded-full bg-white/5 w-2/3" />
    </div>
  </div>
</template>

<style scoped>
.knot-halo {
  animation: knot-halo 3.2s ease-in-out infinite;
}
@keyframes knot-halo {
  0%, 100% { opacity: 0.5; transform: scale(0.92); }
  50%      { opacity: 1;   transform: scale(1.08); }
}

@media (prefers-reduced-motion: reduce) {
  .knot-halo { animation: none; }
}
</style>
