<template>
  <div class="w-52 lg:w-68 bg-brand-50 rounded-3xl shadow-2xl
              p-5 lg:p-6 flex flex-col">

    <div class="flex justify-end">
      <SharedGradientArrowButton aria-label="Go to contact" @click="goToContact" />
    </div>

    <h3 class="mt-8 text-brand-950 font-semibold text-xl lg:text-2xl leading-snug">
      {{ t('home.infoCard') }}
    </h3>
  </div>
</template>

<script setup>
import { PAGE_STACK_PAGES, usePageStack } from '~/composables/usePageStack'
import { useI18n } from '~/composables/useI18n'

const { t } = useI18n()
const stack = usePageStack()

function goToContact() {
  stack.scrollTo(PAGE_STACK_PAGES.findIndex(p => p.key === 'contact'))
}
</script>
