<template>
  <PagesProjectsSkeleton v-if="isLoading" />
  <div v-else data-testid="page-projects" class="relative w-full h-full p-4 sm:p-6 lg:p-10 pt-0! sm:pt-0! lg:pt-0!
              lg:overflow-hidden
              flex flex-col gap-3 sm:gap-4 lg:gap-6"
    :style="{ opacity: reveal, pointerEvents: reveal > 0.5 ? 'auto' : 'none' }">

    <div class="relative z-10 select-none pointer-events-none"
      v-motion
      :initial="{ opacity: 0, y: -20 }"
      :enter="{ opacity: 1, y: 0, transition: { duration: 600, delay: 100 } }">
      <SharedMarqueeStrip :text="t('marquee.projects')" direction="right" />
    </div>

    <PagesProjectsGrid class="relative z-10 flex-1 min-h-0"
      v-motion
      :initial="{ opacity: 0, y: 30 }"
      :enter="{ opacity: 1, y: 0, transition: { duration: 700, delay: 200 } }" />
  </div>
</template>

<script setup>
import { usePageReveal } from '~/composables/usePageStack'
import { usePageSkeleton } from '~/composables/usePageSkeleton'
import { useI18n } from '~/composables/useI18n'

const { t } = useI18n()

const { isLoading } = usePageSkeleton(2)

const reveal = usePageReveal(2)
</script>
