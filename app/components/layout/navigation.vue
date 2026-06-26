<template>
  <SharedPillBubble
    v-motion
    :initial="{ opacity: 0, y: -30 }"
    :enter="{ opacity: 1, y: 0, transition: { duration: 600, delay: 100 } }"
    class="w-full flex items-center gap-2 lg:gap-4 py-1! px-2! lg:px-2!">
    <SharedLogo data-testid="nav-logo" class="shrink-0 ml-1 lg:ml-2" />
    <nav class="flex-1 hidden lg:flex items-center justify-center gap-1.5 lg:gap-2">
      <SharedNavLink v-for="(link, i) in links" :key="i"
        :text="link.text" :to="link.to" :page-key="link.key" :icon="link.icon"
        :active="stack.activeIndex.value === i" />
    </nav>
    <div class="flex-1 lg:hidden"></div>
    <LayoutLanguageSwitcher class="hidden lg:block" />
    <div class="hidden lg:block shrink-0">
      <SharedCtaButton data-testid="nav-contact-me" :text="t('nav.contactMe')" align="right"
        :link="sendMessagePath"
        size-class="size-8 lg:size-9" icon-class="size-4 lg:size-4.5" />
    </div>
    <button type="button" aria-label="Open menu" @click="menuOpen = true"
      class="lg:hidden shrink-0 inline-flex items-center justify-center size-10 rounded-full text-tertiary-font hover:bg-white/10 transition">
      <SharedIconsBars3 class="size-6" />
    </button>
  </SharedPillBubble>

  <LayoutMobileMenu :open="menuOpen" @close="menuOpen = false" />
</template>

<script setup>
import { ref, computed } from 'vue'
import Briefcase from '~/components/shared/icons/briefcase.vue'
import InformationCircle from '~/components/shared/icons/information-circle.vue'
import Identification from '~/components/shared/icons/identification.vue'
import FaceSmile from '~/components/shared/icons/face-smile.vue'
import Home from '~/components/shared/icons/home.vue'
import Contact from '~/components/shared/icons/contact.vue'
import { usePageStack } from '~/composables/usePageStack'
import { useI18n } from '~/composables/useI18n'
import { useLocale } from '~/composables/useLocale'
import { localizedPath } from '~/i18n/routes'

const stack = usePageStack()
const { t } = useI18n()
const { currentLocale } = useLocale()
const menuOpen = ref(false)

const sendMessagePath = computed(() => localizedPath('send-message', currentLocale.value))

const links = computed(() => [
  { key: 'home', text: t('nav.home'), to: localizedPath('home', currentLocale.value), icon: Home },
  { key: 'about', text: t('nav.about'), to: localizedPath('about', currentLocale.value), icon: InformationCircle },
  { key: 'projects', text: t('nav.projects'), to: localizedPath('projects', currentLocale.value), icon: Briefcase },
  { key: 'contact', text: t('nav.contact'), to: localizedPath('contact', currentLocale.value), icon: Contact },
])
</script>
