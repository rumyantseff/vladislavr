<script setup lang="ts">
import { computed } from 'vue'
import { PAGE_STACK_PAGES, usePageStack } from '~/composables/usePageStack'

const props = defineProps<{
  text: string
  to: string
  pageKey: string
  icon?: any
  active?: boolean
}>()

const stack = usePageStack()

const testSlug = computed(() => props.pageKey)

function handleClick() {
  const idx = PAGE_STACK_PAGES.findIndex(p => p.key === props.pageKey)
  if (idx >= 0 && stack.scrollTo(idx)) return
  navigateTo(props.to)
}
</script>

<template>
  <NuxtLink
    :to="to"
    :data-testid="`nav-link-${testSlug}`"
    :class="[
      'nav-link group relative inline-flex items-center justify-center overflow-hidden',
      'min-w-32 lg:min-w-36 min-h-11 lg:min-h-12',
      'px-6 lg:px-7 py-1',
      'rounded-full bg-white/5 border border-white/10',
      'text-tertiary-font font-semibold text-sm lg:text-base',
      'whitespace-nowrap',
      active ? 'is-active' : ''
    ]"
    @click.prevent="handleClick"
  >
    <span
      aria-hidden="true"
      :class="[
        'nav-icon absolute left-1.5 lg:left-1 top-1/2',
        'size-9 lg:size-10 rounded-full backdrop-blur-xl',
        'flex items-center justify-center',
        'bg-white/15 border border-white/20'
      ]"
    >
      <component
        v-if="icon"
        :is="icon"
        class="size-4 lg:size-4.5 shrink-0 fill-current"
      />
    </span>

    <span class="nav-text">
      {{ text }}
    </span>
  </NuxtLink>
</template>

<style scoped>
.nav-link {
  --text-shift: 0rem;

  transition:
    background-color 0.3s ease-out,
    border-color 0.3s ease-out;
}

.nav-icon {
  transform: translateY(-50%) translateX(-6px) scale(0) rotate(-35deg);
  opacity: 0;
  transform-origin: center;

  transition:
    transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1),
    opacity 0.22s ease-out;
}

.nav-text {
  position: relative;
  z-index: 1;

  display: inline-block;
  transform: translateX(var(--text-shift));

  transition:
    transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.is-active {
  --text-shift: 1.25rem;
}

@media (min-width: 1024px) {
  .is-active {
    --text-shift: 1.25rem;
  }
}

.is-active .nav-icon {
  transform: translateY(-50%) translateX(0) scale(1) rotate(0deg);
  opacity: 1;
}

@media (prefers-reduced-motion: reduce) {
  .nav-icon,
  .nav-text {
    transition-duration: 0.15s;
    transition-timing-function: ease-out;
  }
}
</style>