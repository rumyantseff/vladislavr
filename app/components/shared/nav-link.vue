<template>
  <NuxtLink :to="to"
    :data-testid="`nav-link-${testSlug}`"
    :class="['nav-link group relative inline-flex items-center justify-center overflow-hidden',
             'min-w-32 lg:min-w-36 min-h-11 lg:min-h-12',
             'pl-1 pr-6 lg:pr-7 py-1',
             'rounded-full bg-white/5 border border-white/10',
             'text-tertiary-font font-semibold text-sm lg:text-base',
             'whitespace-nowrap',
             active ? 'is-active' : '']"
    @click.prevent="handleClick">
    <!-- icon is absolutely placed on the left so revealing it never reflows the text; the text
         slides via transform. Everything animates on the compositor (transform/opacity), so it
         stays smooth even while the page-stack scroll animation is busy on the main thread. -->
    <span aria-hidden="true"
      :class="['nav-icon absolute left-1.5 lg:left-2 top-1/2',
               'size-9 lg:size-10 rounded-full backdrop-blur-xl',
               'flex items-center justify-center',
               'bg-white/15 border border-white/20']">
      <component v-if="icon" :is="icon" class="size-4 lg:size-4.5 shrink-0" />
    </span>
    <span class="nav-text">{{ text }}</span>
  </NuxtLink>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { PAGE_STACK_PAGES, usePageStack } from '~/composables/usePageStack'

const props = defineProps<{
  text: string
  to: string
  icon?: any
  active?: boolean
}>()

const stack = usePageStack()

const testSlug = computed(() => {
  if (props.to === '/') return 'home'
  return props.to.replace(/^\//, '').replace(/\//g, '-')
})

function handleClick() {
  const idx = PAGE_STACK_PAGES.findIndex(p => p.path === props.to)
  if (idx >= 0) {
    stack.scrollTo(idx)
  }
}
</script>

<style scoped>
/* springy "back" curve so the icon pops in with a tiny overshoot, then settles — that little
   bounce is what makes the switch feel alive. */
.nav-link {
  transition: background-color 0.3s ease-out, border-color 0.3s ease-out;
}

.nav-icon {
  /* centred vertically; hidden state = shrunk, nudged left and tilted */
  transform: translateY(-50%) translateX(-6px) scale(0) rotate(-35deg);
  opacity: 0;
  transform-origin: center;
  transition:
    transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1),
    opacity 0.22s ease-out;
}

.nav-text {
  display: inline-block;
  /* inactive text sits centred (icon takes no visual room); active text slides right to clear
     the icon. translate is compositor-only so it stays smooth during the scroll animation. */
  transform: translateX(0);
  transition: transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.is-active .nav-icon {
  transform: translateY(-50%) translateX(0) scale(1) rotate(0deg);
  opacity: 1;
}

.is-active .nav-text {
  transform: translateX(1.35rem);
}

@media (min-width: 1024px) {
  .is-active .nav-text { transform: translateX(1.6rem); }
}

@media (prefers-reduced-motion: reduce) {
  .nav-icon, .nav-text { transition-duration: 0.15s; transition-timing-function: ease-out; }
}
</style>
