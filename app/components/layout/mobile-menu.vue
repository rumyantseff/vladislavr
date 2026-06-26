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
            <button v-for="(link, i) in links" :key="i" type="button"
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
            :link="sendMessagePath" @click="$emit('close')" />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { computed } from 'vue'
import { usePageStack, PAGE_STACK_PAGES } from '~/composables/usePageStack'
import { useI18n } from '~/composables/useI18n'
import { useLocale } from '~/composables/useLocale'
import { localizedPath } from '~/i18n/routes'

defineProps({ open: { type: Boolean, default: false } })
const emit = defineEmits(['close'])

const stack = usePageStack()
const { t } = useI18n()
const { currentLocale } = useLocale()
const activeIndex = stack.activeIndex

const sendMessagePath = computed(() => localizedPath('send-message', currentLocale.value))

// navigation is index-based via go(i) -> stack.scrollTo(i), so only the visible label matters
const links = computed(() => [
  { text: t('nav.home') },
  { text: t('nav.about') },
  { text: t('nav.projects') },
  { text: t('nav.contact') },
])

function go(i) {
  // a mounted page-stack scrolls to the section; otherwise (on /send-message) navigate by URL
  if (!stack.scrollTo(i)) {
    const key = PAGE_STACK_PAGES[i]?.key
    if (key) navigateTo(localizedPath(key, currentLocale.value))
  }
  emit('close')
}

// open: each item rises in after a growing delay; close: items fall out in reverse order
// (last shown leaves first) so the whole thing collapses upward like a mirror of the open.
const ITEM_COUNT = computed(() => 3 + links.value.length) // logo + links + switcher + cta
function delay(i) {
  const out = (ITEM_COUNT.value - 1 - i) * 40
  return { '--d': `${120 + i * 55}ms`, '--dout': `${out}ms` }
}
</script>

<style scoped>
/* OPEN: clip-path circle expands from the top-right (hamburger spot). */
.menu-enter-active {
  transition: clip-path 520ms cubic-bezier(0.22, 1, 0.36, 1), opacity 200ms ease;
}
/* CLOSE: the exact reverse — items stagger out first, then the clip-path circle collapses
   back to the same top-right spot (delayed so it mirrors open: panel-then-items / items-then-panel). */
.menu-leave-active {
  transition: clip-path 520ms cubic-bezier(0.22, 1, 0.36, 1) 220ms, opacity 200ms ease 540ms;
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
  transform: translateY(0);
}
/* items stagger IN (rise from below + fade) */
.menu-enter-active .menu-stagger {
  animation: menu-item-in 460ms cubic-bezier(0.22, 1, 0.36, 1) both;
  animation-delay: var(--d, 0ms);
}
@keyframes menu-item-in {
  from { opacity: 0; transform: translateY(18px); }
  to   { opacity: 1; transform: translateY(0); }
}
/* items stagger OUT (the reverse: rise further up + fade), reversed order via --dout */
.menu-leave-active .menu-stagger {
  animation: menu-item-out 320ms cubic-bezier(0.55, 0, 0.45, 1) both;
  animation-delay: var(--dout, 0ms);
}
@keyframes menu-item-out {
  from { opacity: 1; transform: translateY(0); }
  to   { opacity: 0; transform: translateY(-18px); }
}

/* close button spins IN on open, spins OUT on close (mirror) */
.menu-enter-active .menu-close {
  animation: menu-close-in 500ms cubic-bezier(0.22, 1, 0.36, 1) both;
  animation-delay: 120ms;
}
@keyframes menu-close-in {
  from { opacity: 0; transform: rotate(-90deg) scale(0.6); }
  to   { opacity: 1; transform: rotate(0) scale(1); }
}
.menu-leave-active .menu-close {
  animation: menu-close-out 320ms cubic-bezier(0.55, 0, 0.45, 1) both;
}
@keyframes menu-close-out {
  from { opacity: 1; transform: rotate(0) scale(1); }
  to   { opacity: 0; transform: rotate(-90deg) scale(0.6); }
}

@media (prefers-reduced-motion: reduce) {
  .menu-enter-active, .menu-leave-active { transition: opacity 200ms ease; }
  .menu-enter-from, .menu-leave-to { clip-path: none; opacity: 0; }
  .menu-stagger { opacity: 1; transform: none; }
  .menu-enter-active .menu-stagger,
  .menu-leave-active .menu-stagger,
  .menu-enter-active .menu-close,
  .menu-leave-active .menu-close { animation: none; }
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
