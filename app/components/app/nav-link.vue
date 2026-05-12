<template>
  <NuxtLink :to="to"
    active-class="is-active"
    class="group inline-flex items-center justify-center in-[.is-active]:justify-start
           gap-0 in-[.is-active]:gap-2
           min-w-32 lg:min-w-36 min-h-11 lg:min-h-12
           pl-1 pr-6 lg:pr-7 py-1
           rounded-full bg-brand-50
           text-primary-font font-semibold text-sm lg:text-base
           hover:bg-brand-50/70
           transition-all duration-300 ease-out whitespace-nowrap">
    <span class="rounded-full bg-white/40 backdrop-blur-xl border border-white/40
                 flex items-center justify-center overflow-hidden shrink-0
                 size-0 in-[.is-active]:size-9 lg:in-[.is-active]:size-10
                 transition-all duration-300 ease-out">
      <component v-if="icon" :is="icon" class="size-4 lg:size-4.5 shrink-0" />
    </span>
    <span>{{ text }}</span>
  </NuxtLink>
</template>

<script setup>
defineProps({
  text: { type: String, required: true },
  to: { type: String, default: '#' },
  icon: { type: [Object, Function], default: null },
})
</script>
