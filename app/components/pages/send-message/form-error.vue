<template>
  <div class="flex flex-col items-center text-center gap-5 lg:gap-6 py-4">
    <!-- stacked "depth" badge in warm red + a sad face -->
    <div class="status-badge status-badge--err">
      <span class="status-layer status-layer--3" />
      <span class="status-layer status-layer--2" />
      <span class="status-layer status-layer--1">
        <SharedIconsFaceFrown class="size-7 lg:size-8 text-white" />
      </span>
    </div>

    <h2 class="text-2xl lg:text-3xl font-semibold text-tertiary-font">{{ t('form.error.title') }}</h2>
    <p class="max-w-sm text-sm lg:text-base text-tertiary-font/70 leading-relaxed">
      {{ t('form.error.hint') }}
    </p>

    <button type="button" @click="$emit('retry')"
      class="mt-1 inline-flex items-center gap-2 rounded-full bg-brand-950 hover:bg-black
             border border-white/15 px-6 py-2.5 text-sm lg:text-base font-semibold
             text-tertiary-font transition">
      {{ t('form.error.retry') }}
    </button>

    <div class="flex flex-col items-center gap-3 mt-1">
      <span class="text-xs text-tertiary-font/50">{{ t('form.error.contact') }}</span>
      <div class="flex items-center gap-2.5">
        <a v-for="c in contacts" :key="c.label" :href="c.href"
          :target="c.external ? '_blank' : undefined" :rel="c.external ? 'noopener' : undefined"
          :aria-label="c.label"
          class="size-10 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10
                 flex items-center justify-center text-tertiary-font/80 hover:text-tertiary-font transition">
          <component :is="c.icon" class="size-4.5" />
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from '~/composables/useI18n'
import Github from '~/components/shared/icons/github.vue'
import Linkedin from '~/components/shared/icons/linkedin.vue'
import Contact from '~/components/shared/icons/contact.vue'

defineEmits(['retry'])

const { t } = useI18n()

const contacts = [
  { label: 'Email', href: 'mailto:vladislavr.info@gmail.com', icon: Contact, external: false },
  { label: 'GitHub', href: 'https://github.com/rumyantseff', icon: Github, external: true },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/vladislavrumyantsev-vladislavr/', icon: Linkedin, external: true },
]
</script>
