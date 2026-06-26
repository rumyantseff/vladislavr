<template>
  <div class="flex flex-col items-center text-center gap-5 lg:gap-6 py-4">
    <!-- stacked "depth" badge: three offset layers + a check, in brand green -->
    <div class="status-badge status-badge--ok">
      <span class="status-layer status-layer--3" />
      <span class="status-layer status-layer--2" />
      <span class="status-layer status-layer--1">
        <SharedIconsCheck class="size-7 lg:size-8 text-brand-950" />
      </span>
    </div>

    <h2 class="text-2xl lg:text-3xl font-semibold text-tertiary-font">{{ t('form.success') }}</h2>
    <p class="max-w-sm text-sm lg:text-base text-tertiary-font/70 leading-relaxed">
      {{ t('form.successHint') }}
    </p>

    <NuxtLink :to="homePath"
      class="mt-1 inline-flex items-center gap-2 rounded-full bg-white/10 hover:bg-white/20
             px-5 py-2.5 text-sm lg:text-base font-medium text-tertiary-font transition">
      {{ t('form.back') }}
    </NuxtLink>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from '~/composables/useI18n'
import { useLocale } from '~/composables/useLocale'
import { localizedPath } from '~/i18n/routes'

const { t } = useI18n()
const { currentLocale } = useLocale()
const homePath = computed(() => localizedPath('home', currentLocale.value))
</script>
