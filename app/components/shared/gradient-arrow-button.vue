<template>
  <component :is="tag" :class="[
      'rounded-full brand-gradient text-brand-950',
      'flex items-center justify-center shrink-0',
      'transition-all duration-300 ease-out',
      sizeClass,
      tag === 'button' ? 'cursor-pointer hover:brightness-110' : '',
    ]"
    v-bind="tag === 'button' ? { type: 'button' } : {}">
    <SharedIconsArrowUpRight :class="iconClass" />
  </component>
</template>

<script setup>
defineProps({
  // 'button' for interactive use, 'div'/'span' for decorative (inside an <a>)
  tag: { type: String, default: 'button' },
  sizeClass: { type: String, default: 'size-12 lg:size-14' },
  iconClass: { type: String, default: 'size-5 lg:size-6' },
})
</script>
