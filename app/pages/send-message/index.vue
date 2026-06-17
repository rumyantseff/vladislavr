<template>
  <div class="w-full h-full">
    <PagesSendMessageForm />
  </div>
</template>

<script setup>
import { useI18n } from '~/composables/useI18n'

const { t } = useI18n()

useHead({ title: () => `Vlad Rumyantsev — ${t('form.send')}` })
</script>
