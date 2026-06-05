<template>
  <div class="w-52 lg:w-68 bg-brand-50 rounded-3xl shadow-2xl
              p-5 lg:p-6 flex flex-col">
    <!-- top: round arrow button (right-aligned) -> Contact -->
    <div class="flex justify-end">
      <SharedGradientArrowButton aria-label="Go to contact" @click="goToContact" />
    </div>

    <!-- big text, pushed to the bottom -->
    <h3 class="mt-8 text-brand-950 font-semibold text-xl lg:text-2xl leading-snug">
      Building reliable, scalable solutions
    </h3>
  </div>
</template>

<script setup>
import { indexForPath, usePageStack } from '~/composables/usePageStack'

const stack = usePageStack()

function goToContact() {
  stack.scrollTo(indexForPath('/contact'))
}
</script>
