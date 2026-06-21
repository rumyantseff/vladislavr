<template>
  <div ref="root" class="relative shrink-0">

    <button type="button" :aria-label="`Language: ${active.code}`" @click.stop="toggle"
      class="p-0.5 rounded-full block hover:brightness-110 transition"
      :class="open ? 'opacity-0 pointer-events-none' : ''">
      <span class="lang-pin size-9 lg:size-10 rounded-full overflow-hidden block border border-white/15">
        <span class="lang-flag" :style="{ backgroundImage: `url(${active.flag})` }" />
      </span>
    </button>

    <Transition :name="align === 'left' ? 'lang-dd-l' : 'lang-dd'">
      <ul v-if="open"
        class="absolute top-0 z-50 flex flex-row items-center gap-1.5 p-1.5 -m-1.5
               rounded-full bg-brand-950 backdrop-blur-xl border border-white/10
               shadow-[0_8px_30px_rgba(0,0,0,0.30)]"
        :class="align === 'left' ? 'left-0' : 'right-0 flex-row-reverse'">
        <li v-for="l in orderedLocales" :key="l.code">
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

.lang-dd-enter-active,
.lang-dd-leave-active,
.lang-dd-l-enter-active,
.lang-dd-l-leave-active {
  transition: opacity 200ms ease, transform 200ms ease;
}
.lang-dd-enter-active,
.lang-dd-leave-active { transform-origin: center right; }
.lang-dd-l-enter-active,
.lang-dd-l-leave-active { transform-origin: center left; }

/* header switcher fans out to the LEFT */
.lang-dd-enter-from,
.lang-dd-leave-to {
  opacity: 0;
  transform: scale(0.9) translateX(12px);
}

/* mobile-menu switcher fans out to the RIGHT */
.lang-dd-l-enter-from,
.lang-dd-l-leave-to {
  opacity: 0;
  transform: scale(0.9) translateX(-12px);
}
</style>
