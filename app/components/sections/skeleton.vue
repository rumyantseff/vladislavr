<template>
  <div class="w-full p-4 sm:p-6 lg:p-10 h-screen overflow-hidden
              grid gap-3 sm:gap-4 lg:gap-10
              grid-cols-12 grid-rows-[auto_auto_1fr_auto] lg:grid-rows-[auto_1fr_auto]
              animate-pulse">
    <!-- Navigation skeleton (pill) -->
    <div class="col-span-12 h-12 lg:h-16 rounded-full bg-brand-50" />

    <!-- Welcome text skeleton -->
    <div class="col-span-12 lg:col-span-7 lg:col-start-1 lg:row-start-2 flex flex-col gap-4 lg:gap-6">
      <div class="h-16 sm:h-20 md:h-28 lg:h-36 xl:h-44 w-1/2 sm:w-2/5 lg:w-2/5 rounded-2xl bg-brand-50 self-start" />
      <div class="self-end max-w-md lg:max-w-[58ch] w-full flex flex-col gap-2">
        <div class="h-3 sm:h-4 lg:h-5 rounded-full bg-brand-50 w-full" />
        <div class="h-3 sm:h-4 lg:h-5 rounded-full bg-brand-50 w-11/12 self-end" />
        <div class="h-3 sm:h-4 lg:h-5 rounded-full bg-brand-50 w-4/5 self-end" />
      </div>
    </div>

    <!-- Hero cards skeleton (2 light + 1 dark) -->
    <div class="col-span-12 lg:col-span-5 lg:col-start-8 lg:row-start-2 lg:row-span-2
                relative w-full h-full max-w-md mx-auto lg:max-w-none">
      <div class="absolute top-0 left-0 right-0 bottom-[calc(50%+5px)] rounded-3xl bg-brand-50" />
      <div class="absolute top-[calc(50%+5px)] left-0 right-0 bottom-0 rounded-3xl bg-brand-50" />
      <div class="absolute bottom-0 left-10 right-10 h-[80%] lg:h-[507px] lg:left-20 lg:right-20 rounded-3xl bg-brand-900/80" />
    </div>

    <!-- Name skeleton -->
    <div class="col-span-12 lg:col-span-7 lg:col-start-1 lg:row-start-3 self-end flex flex-col gap-1 lg:gap-2">
      <div class="h-9 sm:h-12 lg:h-14 xl:h-16 w-32 sm:w-40 lg:w-48 rounded-2xl bg-brand-50" />
      <div class="h-9 sm:h-12 lg:h-14 xl:h-16 w-56 sm:w-72 lg:w-96 rounded-2xl bg-brand-50" />
    </div>
  </div>
</template>
