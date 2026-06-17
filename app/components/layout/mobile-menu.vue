<template>
  <Teleport to="body">
    <Transition name="menu">
      <div v-if="open" class="menu-panel fixed inset-0 z-50 lg:hidden bg-brand-950 flex flex-col">

        <div aria-hidden="true" class="menu-glow menu-glow--left" />
        <div aria-hidden="true" class="menu-glow menu-glow--right" />

        <div class="relative z-10 shrink-0 px-4 sm:px-6 pt-4 pb-4 sm:pt-6 sm:pb-6">
          <div class="flex items-center px-2 py-1">
            <SharedLogo class="menu-stagger shrink-0 ml-1" :style="delay(0)" />
            <div class="flex-1" />
            <button type="button" aria-label="Close menu" @click="$emit('close')"
              class="menu-close shrink-0 inline-flex items-center justify-center size-10 rounded-full text-tertiary-font hover:bg-white/10 transition">
              <SharedIconsXMark class="size-6" />
            </button>
          </div>
        </div>

        <div class="relative z-10 flex-1 flex flex-col px-6 sm:px-8 pt-2">
          <nav class="flex flex-col">
            <button v-for="(link, i) in links" :key="link.to" type="button"
              @click="go(i)"
              class="menu-stagger py-2.5 text-left text-3xl sm:text-4xl font-semibold transition-colors"
              :class="activeIndex === i ? 'text-tertiary-font' : 'text-tertiary-font/60 hover:text-tertiary-font'"
              :style="delay(1 + i)">
              {{ link.text }}
            </button>
          </nav>

          <div class="menu-stagger mt-6" :style="delay(1 + links.length)">
            <LayoutLanguageSwitcher align="left" />
          </div>
        </div>

        <div class="menu-stagger relative z-10 shrink-0 px-6 sm:px-8 pb-8" :style="delay(2 + links.length)">
          <SharedCtaButton :text="t('nav.contactMe')" align="right" full
            link="mailto:vladik.rumyantsev@gmail.com" />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { computed } from 'vue'
import { usePageStack } from '~/composables/usePageStack'
import { useI18n } from '~/composables/useI18n'

defineProps({ open: { type: Boolean, default: false } })
const emit = defineEmits(['close'])

const stack = usePageStack()
const { t } = useI18n()
const activeIndex = stack.activeIndex

const links = computed(() => [
  { text: t('nav.home'), to: '/' },
  { text: t('nav.about'), to: '/about' },
  { text: t('nav.projects'), to: '/projects' },
  { text: t('nav.contact'), to: '/contact' },
])

function go(i) {
  stack.scrollTo(i)
  emit('close')
}

function delay(i) {
  return { '--d': `${120 + i * 55}ms` }
}
</script>

<style scoped>
.menu-enter-active {
  transition: clip-path 520ms cubic-bezier(0.22, 1, 0.36, 1), opacity 200ms ease;
}
.menu-leave-active {
  transition: clip-path 420ms cubic-bezier(0.55, 0, 0.45, 1), opacity 260ms ease;
}
.menu-enter-from,
.menu-leave-to {

  clip-path: circle(0% at calc(100% - 36px) 36px);
  opacity: 0.6;
}
.menu-enter-to,
.menu-leave-from {
  clip-path: circle(150% at calc(100% - 36px) 36px);
  opacity: 1;
}

.menu-stagger {
  opacity: 1;
  transform: translateX(0);
}
.menu-enter-active .menu-stagger {
  animation: menu-item-in 460ms cubic-bezier(0.22, 1, 0.36, 1) both;
  animation-delay: var(--d, 0ms);
}
@keyframes menu-item-in {
  from { opacity: 0; transform: translateX(-18px); }
  to   { opacity: 1; transform: translateX(0); }
}

.menu-enter-active .menu-close {
  animation: menu-close-in 500ms cubic-bezier(0.22, 1, 0.36, 1) both;
  animation-delay: 120ms;
}
@keyframes menu-close-in {
  from { opacity: 0; transform: rotate(-90deg) scale(0.6); }
  to   { opacity: 1; transform: rotate(0) scale(1); }
}

@media (prefers-reduced-motion: reduce) {
  .menu-enter-active, .menu-leave-active { transition: opacity 200ms ease; }
  .menu-enter-from, .menu-leave-to { clip-path: none; opacity: 0; }
  .menu-stagger { opacity: 1; transform: none; }
  .menu-enter-active .menu-stagger,
  .menu-enter-active .menu-close { animation: none; }
}

.menu-glow {
  position: absolute;
  bottom: -6%;
  z-index: 0;
  pointer-events: none;
  border-radius: 9999px;
  filter: blur(70px);
  height: 42%;
  width: 70%;
  opacity: 0.9;
}
.menu-glow--left {
  left: -18%;
  background: radial-gradient(circle at center,
    rgba(185, 212, 47, 0.55) 0%, rgba(185, 212, 47, 0.14) 45%, transparent 72%);
}
.menu-glow--right {
  right: -18%;
  background: radial-gradient(circle at center,
    rgba(255, 139, 51, 0.5) 0%, rgba(255, 139, 51, 0.12) 45%, transparent 72%);
}
</style>
