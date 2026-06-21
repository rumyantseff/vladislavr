<template>
  <PagesAboutSkeleton v-if="isLoading" />

  <div v-else data-testid="page-about" class="relative w-full h-full p-4 sm:p-6 lg:p-10 pt-0! sm:pt-0! lg:pt-0!
              lg:overflow-hidden
              flex flex-col lg:flex-row gap-3 lg:gap-6"
    :style="{ opacity: reveal, pointerEvents: reveal > 0.5 ? 'auto' : 'none' }">

    <div class="lg:hidden relative z-10 select-none pointer-events-none"
      v-motion
      :initial="{ opacity: 0, y: -20 }"
      :enter="{ opacity: 1, y: 0, transition: { duration: 600, delay: 150 } }">
      <SharedMarqueeStrip :text="t('marquee.about')" direction="right" />
    </div>

    <div class="relative z-10 hidden lg:block w-12 lg:w-20 xl:w-24 shrink-0 select-none pointer-events-none"
      v-motion
      :initial="{ opacity: 0, x: -30 }"
      :enter="{ opacity: 1, x: 0, transition: { duration: 700, delay: 300 } }">
      <SharedMarqueeStripVertical :text="t('marquee.about')" direction="up" flip />
    </div>

    <div class="relative z-10 flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-2">

      <div class="intro-card relative lg:col-span-1 flex flex-col rounded-2xl lg:rounded-3xl overflow-hidden
                  p-5 lg:p-10"
        :style="introStyle">
        <svg aria-hidden="true" class="wave-pattern absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 100 130" preserveAspectRatio="xMidYMid slice">
          <path v-for="(d, i) in waves" :key="i" :d="d"
            fill="none" stroke="#ffffff" :stroke-width="0.35" :opacity="0.03" />
        </svg>
        <PagesAboutIntro class="relative z-10 flex-1 min-h-0" />
      </div>

      <div class="lg:col-span-2 flex flex-col gap-3 lg:gap-0 min-h-0">
        <div class="lg:hidden select-none pointer-events-none w-full"
          v-motion
          :initial="{ opacity: 0, y: -20 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 600, delay: 200 } }">
          <SharedMarqueeStrip :text="t('marquee.services')" direction="right" />
        </div>
        <PagesAboutServices class="h-full min-h-0" />
      </div>
    </div>

    <div class="relative z-10 hidden lg:block w-12 lg:w-20 xl:w-24 shrink-0 select-none pointer-events-none"
      v-motion
      :initial="{ opacity: 0, x: 30 }"
      :enter="{ opacity: 1, x: 0, transition: { duration: 700, delay: 350 } }">
      <SharedMarqueeStripVertical :text="t('marquee.services')" direction="down" flip />
    </div>
  </div>
</template>

<style scoped>
.intro-card {
  background-color: #131311;
  background-image:
    radial-gradient(120% 90% at 100% 100%,
      rgba(255, 139, 51, 0.55) 0%,
      rgba(255, 139, 51, 0.18) 28%,
      transparent 55%),
    radial-gradient(120% 90% at 0% 0%,
      rgba(185, 212, 47, 0.5) 0%,
      rgba(185, 212, 47, 0.16) 30%,
      transparent 58%);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.08);
}
</style>

<script setup>
import { usePageReveal } from '~/composables/usePageStack'
import { usePageSkeleton } from '~/composables/usePageSkeleton'
import { useCardTransition } from '~/composables/useCardTransition'
import { useI18n } from '~/composables/useI18n'

// flowing wave lines — fully static SVG paths, computed ONCE at module load (was a per-scroll
// computed doing 34×26 = 884 iterations). viewBox 100 x 130.
const waves = buildWaves()
function buildWaves() {
  const out = []
  const COUNT = 34
  const STEPS = 26
  for (let n = 0; n < COUNT; n++) {
    const baseX = -10 + (n / (COUNT - 1)) * 120
    let d = ''
    for (let s = 0; s <= STEPS; s++) {
      const y = (s / STEPS) * 130
      const tt = s / STEPS
      const amp = 6 + 10 * Math.sin(tt * Math.PI)
      const x = baseX + amp * Math.sin(tt * 3.2 + n * 0.45)
      d += (s === 0 ? 'M' : 'L') + x.toFixed(2) + ' ' + y.toFixed(2) + ' '
    }
    out.push(d.trim())
  }
  return out
}

const { t } = useI18n()

const { isLoading } = usePageSkeleton(1)

const reveal = usePageReveal(1)

const introStyle = useCardTransition({
  pageIndex: 1, index: 0, count: 1,
  enter: { y: -60 },
  exit: { x: -180 },
  arrive: () => reveal.value,
})
</script>
