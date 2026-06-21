<template>
  <PagesHomeSkeleton v-if="isLoading" />
  <template v-else>
    <ClientOnly>
      <SharedAbstractScene class="fixed inset-0 z-10 pointer-events-none" />
    </ClientOnly>

    <div data-testid="page-home" class="relative w-full h-full p-4 sm:p-6 lg:p-10 pt-0! sm:pt-0! lg:pt-0!
                overflow-hidden
                grid gap-3 sm:gap-4 lg:gap-10
                grid-cols-12 grid-rows-[auto_1fr_auto]"
      :style="{ opacity: t, pointerEvents: t < 0.5 ? 'none' : 'auto' }">

      <PagesHomeHelloOverlay />

      <div aria-hidden="true"
        class="fixed inset-x-0 top-0 h-40 z-20 pointer-events-none
               bg-linear-to-b from-brand-950 via-brand-950/80 to-transparent" />
      <div aria-hidden="true"
        class="fixed inset-x-0 bottom-0 h-64 z-10 pointer-events-none
               bg-linear-to-t from-brand-950 via-brand-950/80 to-transparent" />
      <PagesHomeInfoCard class="relative z-20 hidden lg:flex lg:col-span-5 lg:col-start-8 lg:row-start-1 justify-self-end"
        v-motion
        :initial="{ opacity: 0, y: -30 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 700, delay: 600 } }" />
      <PagesHomeHeroCards class="relative z-10 col-span-12 lg:col-span-7 lg:col-start-1 lg:row-start-1 lg:row-span-2" />
      <PagesHomeName class="relative z-10 col-span-12 lg:col-span-7 lg:col-start-1 lg:row-start-3 self-end" />
      <PagesHomeWelcomeText class="relative z-10 col-span-12 lg:col-span-5 lg:col-start-8 lg:row-start-3 self-end" />
    </div>
  </template>
</template>

<script setup>
import { usePageVisibility } from '~/composables/usePageStack'
import { usePageSkeleton } from '~/composables/usePageSkeleton'

const { isLoading } = usePageSkeleton(0)

const t = usePageVisibility(0)
</script>
