<template>
  <NuxtLink :to="to"
    :data-testid="`nav-link-${testSlug}`"
    :class="['group inline-flex items-center justify-center',
             'gap-0 min-w-32 lg:min-w-36 min-h-11 lg:min-h-12',
             'pl-1 pr-6 lg:pr-7 py-1',
             'rounded-full bg-white/5 border border-white/10',
             'text-tertiary-font font-semibold text-sm lg:text-base',
             'hover:bg-white/10',
             'transition-all duration-300 ease-out whitespace-nowrap',
             active ? 'is-active justify-start gap-2' : '']"
    @click.prevent="handleClick">
    <span :class="['rounded-full backdrop-blur-xl',
                   'flex items-center justify-center overflow-hidden shrink-0',
                   'transition-all duration-300 ease-out',
                   active ? 'size-9 lg:size-10 bg-white/15 border border-white/20' : 'size-0 border-0']">
      <component v-if="icon" :is="icon" class="size-4 lg:size-4.5 shrink-0" />
    </span>
    <span>{{ text }}</span>
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
