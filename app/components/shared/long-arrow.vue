<template>
  <!-- long thin arrow: a stretched shaft that fills the width + a crisp fixed head.
       The head "blinks" — nudging forward + fading to hint the swipe direction. -->
  <span class="flex items-center w-full px-2.5">
    <span class="long-arrow-shaft flex-1 h-px bg-current" />
    <svg viewBox="0 0 6 12" fill="none" stroke="currentColor" stroke-width="1.5"
      class="long-arrow-head h-3 -ml-px shrink-0" aria-hidden="true">
      <path d="M1 1.5 L5 6 L1 10.5" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  </span>
</template>

<style scoped>
.long-arrow-head {
  animation: arrow-blink 1.4s ease-in-out infinite;
}
.long-arrow-shaft {
  animation: shaft-blink 1.4s ease-in-out infinite;
}

@keyframes arrow-blink {
  0%, 100% { transform: translateX(0); opacity: 0.6; }
  50%      { transform: translateX(3px); opacity: 1; }
}
@keyframes shaft-blink {
  0%, 100% { opacity: 0.4; }
  50%      { opacity: 0.9; }
}

@media (prefers-reduced-motion: reduce) {
  .long-arrow-head,
  .long-arrow-shaft { animation: none; }
}
</style>
