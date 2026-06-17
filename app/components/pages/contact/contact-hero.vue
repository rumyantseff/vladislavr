<template>
  <div class="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 lg:gap-12">
    <h1 class="font-light tracking-tight leading-[0.95] text-tertiary-font
               text-3xl sm:text-5xl lg:text-7xl xl:text-8xl">
      {{ t('contact.title.1') }}<br />{{ t('contact.title.2') }}
    </h1>
    <SharedCtaButton :text="t('contact.hire')" align="right" link="/send-message"
      class="self-start lg:self-end" />
  </div>
</template>

<script setup>
import { useI18n } from '~/composables/useI18n'

const { t } = useI18n()
</script>
