<template>
  <div aria-hidden="true" class="hello-overlay px-4 sm:px-6 lg:px-10"
    v-motion
    :initial="{ opacity: 0, y: -30 }"
    :enter="{ opacity: 0.55, y: 0, transition: { duration: 800, delay: 200 } }">
    <svg class="hello-svg" viewBox="0 0 2400 300" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="hello-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#ffffff" stop-opacity="0.95" />
          <stop offset="35%" stop-color="#ffffff" stop-opacity="0.45" />
          <stop offset="70%" stop-color="#ffffff" stop-opacity="0.08" />
          <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
        </linearGradient>
      </defs>
      <text x="1200" y="235" text-anchor="middle"
        fill="none" stroke="url(#hello-grad)" stroke-width="2"
        stroke-linejoin="round" stroke-linecap="round" paint-order="stroke"
        class="hello-text">HELLO</text>
    </svg>
  </div>
</template>

<style scoped>
.hello-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 0;
  display: flex;
  justify-content: center;
  pointer-events: none;
}

.hello-svg {
  width: 100%;
  height: auto;
  max-height: 78vh;
}

.hello-text {
  font-family: "Archivo", sans-serif;
  font-weight: 800;
  font-size: 290px;
  letter-spacing: 150px;
}
</style>
