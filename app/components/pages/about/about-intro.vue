<template>
  <div class="h-full flex flex-col justify-center">
    <h2
      v-motion
      :initial="{ opacity: 0, x: -40 }"
      :enter="{ opacity: 1, x: 0, transition: { duration: 700, delay: 300 } }"
      class="font-regular uppercase tracking-tight leading-[1.25] text-brand-950
             text-2xl sm:text-3xl lg:text-4xl xl:text-5xl max-w-[11.5ch]">
      {{ t('about.intro.title.1') }} {{ t('about.intro.title.2') }}
    </h2>
  </div>
</template>

<script setup>
import { useI18n } from '~/composables/useI18n'

const { t } = useI18n()
</script>
