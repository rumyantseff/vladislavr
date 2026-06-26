<template>
  <div ref="root" class="relative shrink-0">

    <button type="button" :aria-label="`Language: ${active.code}`" @click.stop="toggle"
      class="p-0.5 rounded-full block hover:brightness-110 transition"
      :class="open ? 'opacity-0 pointer-events-none' : ''">
      <span class="lang-pin size-9 lg:size-10 rounded-full overflow-hidden block border border-white/15">
        <span class="lang-flag" :style="{ backgroundImage: `url(${active.flag})` }" />
      </span>
    </button>

    <Transition :name="align === 'left' ? 'lang-shell-l' : 'lang-shell'">
      <ul v-if="open"
        class="absolute top-0 z-50 flex flex-row items-center gap-1.5 p-1.5 -m-1.5
               rounded-full bg-brand-950 backdrop-blur-xl border border-white/10
               shadow-[0_8px_30px_rgba(0,0,0,0.30)]"
        :class="align === 'left' ? 'left-0' : 'right-0 flex-row-reverse'">
        <li v-for="(l, i) in orderedLocales" :key="l.code"
          class="lang-item" :style="{ '--i': i, '--n': orderedLocales.length }">
          <button type="button" :aria-label="`Switch to ${l.code}`" @click.stop="choose(l.code)"
            class="block rounded-full transition hover:brightness-110"
            :class="l.code === currentLocale ? 'brand-gradient p-0.5' : ''">
            <span class="lang-pin size-9 lg:size-10 rounded-full overflow-hidden block border"
              :class="l.code === currentLocale ? 'border-transparent' : 'border-white/15'">
              <span class="lang-flag" :style="{ backgroundImage: `url(${l.flag})` }" />
            </span>
          </button>
        </li>
      </ul>
    </Transition>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useLocale } from '~/composables/useLocale'
import { useDropdownToggle } from '~/composables/useDropdownToggle'

defineProps({
  align: { type: String, default: 'right' },
})

const { currentLocale, locales, setLocale } = useLocale()
const { open, root, close, toggle } = useDropdownToggle()

const active = computed(() => locales.find(l => l.code === currentLocale.value) ?? locales[0])

const orderedLocales = computed(() => [
  active.value,
  ...locales.filter(l => l.code !== currentLocale.value),
])

function choose(code) {
  setLocale(code)
  close()
}
</script>

<style scoped>
.lang-pin { position: relative; }
.lang-flag {
  display: block;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

/* OPEN:  shell expands from the trigger side, then flags pop in forward (i = 0 → last).
   CLOSE: exact reverse — flags pop out backward (last → 0) first, then the shell collapses.
   Stagger step is shared so both directions feel symmetric. */

/* --- the pill shell --- */
.lang-shell-enter-active {
  transition: opacity 0.22s ease, transform 0.42s cubic-bezier(0.34, 1.3, 0.5, 1);
  transform-origin: center right;
}
.lang-shell-l-enter-active {
  transition: opacity 0.22s ease, transform 0.42s cubic-bezier(0.34, 1.3, 0.5, 1);
  transform-origin: center left;
}
/* on close the shell waits for the flags to leave, then collapses (mirror of open) */
.lang-shell-leave-active {
  transition: opacity 0.2s ease 0.12s, transform 0.34s cubic-bezier(0.5, 0, 0.75, 0.4) 0.1s;
  transform-origin: center right;
}
.lang-shell-l-leave-active {
  transition: opacity 0.2s ease 0.12s, transform 0.34s cubic-bezier(0.5, 0, 0.75, 0.4) 0.1s;
  transform-origin: center left;
}
/* header switcher unrolls toward the LEFT, mobile-menu one toward the RIGHT */
.lang-shell-enter-from,
.lang-shell-leave-to { opacity: 0; transform: scaleX(0.55) translateX(14px); }
.lang-shell-l-enter-from,
.lang-shell-l-leave-to { opacity: 0; transform: scaleX(0.55) translateX(-14px); }

/* --- each flag, staggered --- */
.lang-shell-enter-active .lang-item,
.lang-shell-l-enter-active .lang-item {
  animation: lang-pop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) both;
  /* forward stagger; active flag (i=0) is already at the trigger spot */
  animation-delay: calc(var(--i) * 55ms + 60ms);
}
.lang-shell-leave-active .lang-item,
.lang-shell-l-leave-active .lang-item {
  animation: lang-unpop 0.28s cubic-bezier(0.4, 0, 0.7, 0.5) both;
  /* reverse stagger: the last flag to appear is the first to leave */
  animation-delay: calc((var(--n) - 1 - var(--i)) * 55ms);
}
@keyframes lang-pop {
  from { opacity: 0; transform: scale(0.4) translateX(8px); }
  to { opacity: 1; transform: scale(1) translateX(0); }
}
@keyframes lang-unpop {
  from { opacity: 1; transform: scale(1) translateX(0); }
  to { opacity: 0; transform: scale(0.4) translateX(8px); }
}
@media (prefers-reduced-motion: reduce) {
  .lang-shell-enter-active, .lang-shell-leave-active,
  .lang-shell-l-enter-active, .lang-shell-l-leave-active { transition-duration: 0.12s; transition-delay: 0s; }
  .lang-shell-enter-active .lang-item, .lang-shell-leave-active .lang-item,
  .lang-shell-l-enter-active .lang-item, .lang-shell-l-leave-active .lang-item { animation: none; }
}
</style>
