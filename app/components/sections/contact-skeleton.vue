<template>
  <div class="w-full h-full p-4 sm:p-6 lg:p-10 pt-0! sm:pt-0! lg:pt-0!
              overflow-hidden">
    <div class="w-full h-full bg-brand-950 rounded-2xl lg:rounded-3xl
                p-4 sm:p-8 lg:p-12
                overflow-hidden
                flex flex-col gap-6 sm:gap-8 lg:gap-16 animate-pulse">
      <!-- Hero placeholder -->
      <div class="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 lg:gap-12">
        <div class="flex flex-col gap-3 lg:gap-4 flex-1">
          <div class="h-8 sm:h-12 lg:h-20 xl:h-24 w-2/3 rounded-xl lg:rounded-2xl bg-tertiary-font/10" />
          <div class="h-8 sm:h-12 lg:h-20 xl:h-24 w-1/3 rounded-xl lg:rounded-2xl bg-tertiary-font/10" />
        </div>
        <div class="h-11 lg:h-14 w-40 lg:w-48 rounded-full bg-tertiary-font/10 self-start lg:self-end" />
      </div>

      <!-- Footer placeholder (mt-auto matches real footer) -->
      <div class="mt-auto flex flex-col gap-4 sm:gap-6 lg:gap-12">
        <!-- Top divider -->
        <div class="h-px w-full bg-linear-to-r from-transparent via-tertiary-font/30 to-transparent" />

        <!-- Columns -->
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-12">
          <!-- Brand block: logo + name + description + 2 social icons -->
          <div class="col-span-2 lg:col-span-1 flex flex-col gap-4">
            <div class="flex items-center gap-3">
              <div class="size-13 rounded bg-tertiary-font/10" />
              <div class="h-5 w-20 rounded bg-tertiary-font/10" />
            </div>
            <div class="flex flex-col gap-2 max-w-xs">
              <div class="h-3 w-full rounded bg-tertiary-font/10" />
              <div class="h-3 w-5/6 rounded bg-tertiary-font/10" />
              <div class="h-3 w-3/4 rounded bg-tertiary-font/10" />
            </div>
            <div class="flex items-center gap-2 mt-2">
              <div class="size-10 rounded-full bg-tertiary-font/10" />
              <div class="size-10 rounded-full bg-tertiary-font/10" />
            </div>
          </div>

          <!-- Address / Email / Phone columns -->
          <div v-for="i in 3" :key="i" class="flex flex-col gap-3">
            <div class="h-4 w-1/2 rounded bg-tertiary-font/10" />
            <div class="h-3 w-3/4 rounded bg-tertiary-font/10" />
          </div>
        </div>

        <!-- Copyright row with gradient divider -->
        <div class="pt-3 lg:pt-4 relative flex justify-center">
          <div class="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-tertiary-font/30 to-transparent" />
          <div class="h-3 w-1/3 rounded bg-tertiary-font/10" />
        </div>
      </div>
    </div>
  </div>
</template>
