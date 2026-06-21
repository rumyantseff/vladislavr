<template>
  <div class="flex flex-col items-start gap-4 text-tertiary-font">
    <div class="size-12 rounded-full brand-gradient flex items-center justify-center text-brand-950">
      <SharedIconsChevronDoubleRight class="size-6" />
    </div>
    <p class="text-xl lg:text-2xl font-semibold">{{ t('form.success') }}</p>
    <p class="text-tertiary-font/70">{{ t('form.successHint') }}</p>
    <NuxtLink to="/"
      class="mt-2 inline-flex items-center gap-2 rounded-full bg-white/10 hover:bg-white/20
             px-5 py-2.5 text-sm lg:text-base font-medium transition">
      {{ t('form.back') }}
    </NuxtLink>
  </div>
</template>

<script setup>
import { useI18n } from '~/composables/useI18n'

const { t } = useI18n()
</script>
