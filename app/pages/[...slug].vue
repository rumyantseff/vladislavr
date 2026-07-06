<template>
  <PagesSendMessageForm v-if="resolved.key === 'send-message'" />
  <LayoutPageStack v-else :initial-index="stackIndex" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { resolvePath, localizedPath, DEFAULT_LOCALE, LOCALE_CODES, type PageKey } from '~/i18n/routes'
import { PAGE_STACK_PAGES } from '~/composables/usePageStack'
import { useLocale } from '~/composables/useLocale'
import { useI18n } from '~/composables/useI18n'

const route = useRoute()
const { currentLocale } = useLocale()
const { t } = useI18n()

const resolved = computed(() =>
  resolvePath(route.path) ?? { locale: DEFAULT_LOCALE, key: 'home' as PageKey },
)

const stackIndex = computed(() =>
  Math.max(0, PAGE_STACK_PAGES.findIndex(p => p.key === resolved.value.key)),
)

useHead(() => ({
  htmlAttrs: { lang: currentLocale.value },
  title:
    resolved.value.key === 'send-message'
      ? `Vlad Rumyantsev — ${t('form.send')}`
      : undefined,
  link: [
    { rel: 'canonical', href: localizedPath(resolved.value.key, resolved.value.locale) },
    ...LOCALE_CODES.map(loc => ({
      rel: 'alternate',
      hreflang: loc,
      href: localizedPath(resolved.value.key, loc),
    })),
    {
      rel: 'alternate',
      hreflang: 'x-default',
      href: localizedPath(resolved.value.key, DEFAULT_LOCALE),
    },
  ],
}))
</script>
