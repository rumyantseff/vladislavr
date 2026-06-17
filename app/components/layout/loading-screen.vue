<template>
  <Transition name="loader">
    <div v-if="visible"
      class="fixed inset-0 z-100 bg-brand-950 flex items-center justify-center select-none">
      <div class="relative flex flex-col items-center gap-6">

        <div class="relative size-32 sm:size-40">
          <svg viewBox="0 0 600 600" class="w-full h-full" aria-hidden="true">
            <defs>
              <linearGradient id="loaderGrad" x1="300" y1="100" x2="300" y2="500"
                gradientUnits="userSpaceOnUse">
                <stop stop-color="#B9D42F" />
                <stop offset="0.33" stop-color="#F3CE47" />
                <stop offset="0.66" stop-color="#FFC870" />
                <stop offset="1" stop-color="#FFC89E" />
              </linearGradient>

              <clipPath id="loaderReveal">
                <rect x="0" :y="revealY" width="600" :height="600 - revealY" />
              </clipPath>
            </defs>

            <path :d="logoPath" fill="#ffffff" fill-opacity="0.14" />

            <path :d="logoPath" fill="url(#loaderGrad)" clip-path="url(#loaderReveal)" />
          </svg>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const SEEN_KEY = 'vr-loader-seen'
const alreadySeen = (() => {
  if (typeof window === 'undefined') return false
  try { return window.localStorage.getItem(SEEN_KEY) === '1' } catch { return false }
})()

const visible = ref(!alreadySeen)
const progress = ref(0)

const logoPath = 'M111.053 100C104.948 100 99.936 104.966 100.602 111.031C106.092 161.069 148.5 200 200 200H331.002H400H488.947C495.052 200 500.064 195.034 499.398 188.969C493.908 138.931 451.5 100 400 100H200H111.053ZM212.723 220C205.696 220 201.063 225.624 203.324 232.271C216.939 272.288 254.684 299.955 297.875 300H347.875H402.238C445.387 299.906 483.074 272.249 496.676 232.271C498.937 225.624 494.304 220 487.277 220H402.238H347.875H212.723ZM312.322 320C306.096 320 301.522 325.029 302.488 331.18C317.13 424.359 395.23 494.804 489.492 499.725C495.29 500.027 500 495.294 500 489.488V330C500 327.348 498.946 324.804 497.071 322.929C495.196 321.054 492.652 320 490 320H312.322Z'

const revealY = computed(() => 500 - (progress.value / 100) * 400)

let raf = 0
let done = false

onMounted(() => {

  if (alreadySeen) return

  const start = performance.now()
  const MIN_MS = 1600
  let settled = false

  const markReady = () => { settled = true }
  if (document.readyState === 'complete') requestAnimationFrame(markReady)
  else window.addEventListener('load', () => requestAnimationFrame(markReady), { once: true })

  const tick = (now) => {
    const elapsed = now - start

    const ceiling = settled && elapsed >= MIN_MS ? 100 : 90
    const speed = ceiling === 100 ? 0.18 : 0.05
    progress.value += (ceiling - progress.value) * speed
    if (progress.value >= 99.5 && ceiling === 100) {
      progress.value = 100
      finish()
      return
    }
    raf = requestAnimationFrame(tick)
  }
  raf = requestAnimationFrame(tick)
})

function finish() {
  if (done) return
  done = true

  try { window.localStorage.setItem(SEEN_KEY, '1') } catch {  }

  setTimeout(() => { visible.value = false }, 350)
}

onBeforeUnmount(() => cancelAnimationFrame(raf))
</script>

<style scoped>
.loader-leave-active {
  transition: opacity 600ms ease, transform 600ms ease;
}
.loader-leave-to {
  opacity: 0;
  transform: scale(1.04);
}
</style>
