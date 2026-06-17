<template>
  <component :is="isInternal ? NuxtLink : 'a'"
    :href="isInternal ? undefined : link" :to="isInternal ? link : undefined"
    data-testid="cta-button"
    class="group items-center gap-2 lg:gap-3 py-1.5
           rounded-full bg-tertiary-font/10 hover:bg-tertiary-font/20
           backdrop-blur-sm transition-colors duration-300"
    :class="[
      full ? 'flex w-full justify-between' : 'inline-flex',
      align === 'right' ? 'pl-5 lg:pl-6 pr-1.5' : 'pr-5 lg:pr-6 pl-1.5',
    ]">

    <span v-if="align === 'right'" class="text-tertiary-font font-medium text-sm lg:text-lg whitespace-nowrap">{{ text }}</span>

    <span :class="[
      'rounded-full brand-gradient flex items-center justify-center text-brand-950',
      'transition-transform duration-300',
      sizeClass,
      align === 'right' ? 'group-hover:translate-x-1' : 'group-hover:translate-x-1',
    ]">
      <SharedIconsChevronDoubleRight :class="iconClass" />
    </span>

    <span v-if="align !== 'right'" class="text-tertiary-font font-medium text-sm lg:text-lg whitespace-nowrap">{{ text }}</span>
  </component>
</template>

<script setup>
import { computed } from 'vue'
import { NuxtLink } from '#components'

const props = defineProps({
  text: { type: String, default: 'Hire Me Now!' },
  link: { type: String, default: '#' },

  align: { type: String, default: 'left' },

  full: { type: Boolean, default: false },
  sizeClass: { type: String, default: 'size-9 lg:size-12' },
  iconClass: { type: String, default: 'size-4 lg:size-5' },
})

const isInternal = computed(() => props.link.startsWith('/'))
</script>
