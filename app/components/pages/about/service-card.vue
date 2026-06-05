<template>
  <div :class="[
        'group relative z-0 hover:z-10 bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-brand-950 hover:border-transparent',
        'text-tertiary-font',
        'rounded-xl lg:rounded-2xl p-3 sm:p-4 lg:p-8 pb-10 sm:pb-12 lg:pb-16',
        'h-full min-h-24 sm:min-h-28 lg:min-h-36',
        'transition-all duration-500 ease-out',
        'hover:shadow-2xl cursor-pointer overflow-hidden',
      ]">
    <!-- Hover ambience: corner green glow + floating bubbles (behind content) -->
    <div class="bubble-layer pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
      <span class="corner-glow" />
      <span class="bubble bubble-1" />
      <span class="bubble bubble-2" />
      <span class="bubble bubble-3" />
    </div>

    <!-- Watermark initials, only on hover (used when no image is set) -->
    <span v-if="initials && !image"
      :class="[
        'pointer-events-none select-none absolute -top-4 -left-2 lg:-top-6 lg:-left-3',
        'text-[7rem] lg:text-[10rem] xl:text-[12rem] leading-none font-bold',
        'text-tertiary-font/5',
        'opacity-0 group-hover:opacity-100',
        'transition-all duration-500',
      ]">
      {{ initials }}
    </span>

    <!-- Watermark image as CSS mask — replaces the initials watermark, same faint tint -->
    <div v-if="image"
      :class="[
        'pointer-events-none absolute z-10 -top-4 -left-2 lg:-top-6 lg:-left-3',
        'size-32 lg:size-44 xl:size-52',
        'opacity-0 group-hover:opacity-[0.05]',
        'transition-all duration-500',
      ]"
      :style="{
        WebkitMaskImage: `url(${image})`,
        maskImage: `url(${image})`,
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center',
        maskPosition: 'center',
        WebkitMaskSize: 'contain',
        maskSize: 'contain',
        backgroundColor: 'var(--color-tertiary-font)',
      }" />

    <div class="relative z-10">
      <h3 class="text-sm sm:text-base lg:text-xl font-semibold mb-1.5 sm:mb-2 lg:mb-3">{{ title }}</h3>
      <p class="text-xs sm:text-sm lg:text-base opacity-80 leading-relaxed">{{ description }}</p>
    </div>

    <div :class="[
          'absolute z-10 bottom-2 right-2 sm:bottom-3 sm:right-3 lg:bottom-6 lg:right-6',
          'size-7 sm:size-8 lg:size-10 rounded-full flex items-center justify-center',
          'brand-gradient text-brand-950',
          'opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0',
          'transition-all duration-500 ease-out',
        ]">
      <SharedIconsArrowUpRight class="size-3.5 sm:size-4 lg:size-5" />
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: { type: String, required: true },
  description: { type: String, required: true },
  initials: { type: String, default: '' },
  direction: { type: String, default: 'down' },
  image: { type: String, default: null },
})
</script>

<style scoped>
.bubble-layer {
  overflow: hidden;
  border-radius: inherit;
}

/* Warm-style corner glow, in our primary green */
.corner-glow {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(120% 90% at 100% 100%,
      rgba(185, 212, 47, 0.45) 0%,
      rgba(155, 180, 38, 0.20) 30%,
      transparent 60%),
    radial-gradient(90% 80% at 0% 0%,
      rgba(194, 220, 81, 0.18) 0%,
      transparent 55%);
}

/* Soft floating glow orbs */
.bubble {
  position: absolute;
  border-radius: 9999px;
  filter: blur(22px);
  will-change: transform;
}

.bubble-1 {
  width: 55%;
  aspect-ratio: 1;
  right: -8%;
  bottom: -12%;
  background: radial-gradient(circle at 35% 35%,
    rgba(205, 227, 114, 0.55), rgba(185, 212, 47, 0.10) 70%, transparent);
  animation: bubble-float-a 9s ease-in-out infinite;
}

.bubble-2 {
  width: 35%;
  aspect-ratio: 1;
  left: 10%;
  bottom: 5%;
  background: radial-gradient(circle at 40% 40%,
    rgba(194, 220, 81, 0.40), rgba(155, 180, 38, 0.08) 70%, transparent);
  animation: bubble-float-b 11s ease-in-out infinite;
  animation-delay: -2s;
}

.bubble-3 {
  width: 28%;
  aspect-ratio: 1;
  left: 45%;
  top: 8%;
  background: radial-gradient(circle at 45% 45%,
    rgba(221, 237, 159, 0.35), rgba(185, 212, 47, 0.06) 70%, transparent);
  animation: bubble-float-c 13s ease-in-out infinite;
  animation-delay: -5s;
}

@keyframes bubble-float-a {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33%      { transform: translate(-12%, -10%) scale(1.08); }
  66%      { transform: translate(6%, -16%) scale(0.96); }
}

@keyframes bubble-float-b {
  0%, 100% { transform: translate(0, 0) scale(1); }
  40%      { transform: translate(14%, -14%) scale(1.12); }
  70%      { transform: translate(-8%, -6%) scale(0.94); }
}

@keyframes bubble-float-c {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50%      { transform: translate(-16%, 12%) scale(1.1); }
}

@media (prefers-reduced-motion: reduce) {
  .bubble { animation: none; }
}
</style>
