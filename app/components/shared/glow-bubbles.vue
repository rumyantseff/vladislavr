<template>
  <div class="bubble-layer pointer-events-none absolute inset-0
              opacity-0 group-hover:opacity-100 transition-opacity duration-500"
    aria-hidden="true">
    <span class="corner-glow" />
    <span class="bubble bubble-1" />
    <span class="bubble bubble-2" />
    <span class="bubble bubble-3" />
  </div>
</template>

<style scoped>
.bubble-layer {
  overflow: hidden;
  border-radius: inherit;
}

.corner-glow {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(120% 90% at 100% 100%,
      rgba(185, 212, 47, 0.22) 0%,
      rgba(155, 180, 38, 0.10) 35%,
      transparent 65%),
    radial-gradient(90% 80% at 0% 0%,
      rgba(255, 139, 51, 0.12) 0%,
      transparent 58%);
}

.bubble {
  position: absolute;
  border-radius: 9999px;
  filter: blur(34px);
  will-change: transform;
}

.bubble-1 {
  width: 55%;
  aspect-ratio: 1;
  right: -8%;
  bottom: -12%;
  background: radial-gradient(circle at 35% 35%,
    rgba(205, 227, 114, 0.28), rgba(185, 212, 47, 0.06) 70%, transparent);
  animation: bubble-float-a 9s ease-in-out infinite;
}

.bubble-2 {
  width: 35%;
  aspect-ratio: 1;
  left: 10%;
  bottom: 5%;
  background: radial-gradient(circle at 40% 40%,
    rgba(255, 139, 51, 0.20), rgba(255, 139, 51, 0.05) 70%, transparent);
  animation: bubble-float-b 11s ease-in-out infinite;
  animation-delay: -2s;
}

.bubble-3 {
  width: 28%;
  aspect-ratio: 1;
  left: 45%;
  top: 8%;
  background: radial-gradient(circle at 45% 45%,
    rgba(255, 168, 99, 0.16), rgba(255, 139, 51, 0.04) 70%, transparent);
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
