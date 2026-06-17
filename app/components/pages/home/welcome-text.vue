<template>
  <div class="flex flex-col gap-4 lg:gap-6">
    <SharedHeadingSubtitle
      v-motion
      :initial="{ opacity: 0, x: 60 }"
      :enter="{ opacity: 1, x: 0, transition: { duration: 700, delay: 500 } }"
      class="self-end">
      {{ t('home.welcome.lead') }} <span class="text-brand-400 font-medium">{{ t('home.welcome.years') }}</span> {{ t('home.welcome.mid') }}
      <span class="text-brand-400 font-medium">{{ t('home.welcome.devops') }}</span>,
      <span class="text-brand-400 font-medium">{{ t('home.welcome.frontend') }}</span>,
      <span class="text-brand-400 font-medium">{{ t('home.welcome.qa') }}</span>, {{ t('home.welcome.and') }}
      <span class="text-brand-400 font-medium">{{ t('home.welcome.brand') }}</span>.
      {{ t('home.welcome.tail') }}
    </SharedHeadingSubtitle>
  </div>
</template>

<script setup>
import { useI18n } from '~/composables/useI18n'

const { t } = useI18n()
</script>
