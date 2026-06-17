<template>
  <PagesContactSkeleton v-if="isLoading" />
  <div v-else data-testid="page-contact" class="w-full h-full p-4 sm:p-6 lg:p-10 pt-0! sm:pt-0! lg:pt-0!
              overflow-hidden"
    :style="{ opacity: reveal, pointerEvents: reveal > 0.5 ? 'auto' : 'none' }">
    <div class="relative w-full h-full bg-brand-950/60 backdrop-blur-xl border border-white/10 rounded-2xl lg:rounded-3xl
                p-4 sm:p-8 lg:p-12
                overflow-hidden
                flex flex-col gap-6 sm:gap-8 lg:gap-16">

      <SharedGlowField />

      <PagesContactHero class="relative z-10"
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 700, delay: 200 } }" />
      <PagesContactFooter class="relative z-10 mt-auto"
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 700, delay: 400 } }" />
    </div>
  </div>
</template>

<script setup>
import { usePageReveal } from '~/composables/usePageStack'
import { usePageSkeleton } from '~/composables/usePageSkeleton'

const { isLoading } = usePageSkeleton(3)

const reveal = usePageReveal(3)
</script>
