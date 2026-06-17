import { onMounted, onBeforeUnmount, type Ref } from 'vue'

export function useCanvasBlur(
  canvas: Ref<HTMLCanvasElement | null>,
  src: () => string,
  enabled: () => boolean,
) {
  let resizeObserver: ResizeObserver | null = null
  let loadedImg: HTMLImageElement | null = null

  function draw() {
    const el = canvas.value
    if (!el || !loadedImg) return
    const rect = el.getBoundingClientRect()
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const w = Math.max(1, Math.round(rect.width * dpr))
    const h = Math.max(1, Math.round(rect.height * dpr))
    el.width = w
    el.height = h
    const ctx = el.getContext('2d')
    if (!ctx) return

    const iw = loadedImg.naturalWidth
    const ih = loadedImg.naturalHeight
    const scale = Math.max(w / iw, h / ih)
    const dw = iw * scale
    const dh = ih * scale
    const dx = (w - dw) / 2
    const dy = (h - dh) / 2

    ctx.clearRect(0, 0, w, h)

    ctx.filter = `blur(${Math.round(22 * dpr)}px)`
    ctx.drawImage(loadedImg, dx, dy, dw, dh)
    ctx.filter = 'none'
  }

  onMounted(() => {
    if (!enabled()) return
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => { loadedImg = img; draw() }
    img.src = src()

    resizeObserver = new ResizeObserver(() => draw())
    if (canvas.value) resizeObserver.observe(canvas.value)
  })

  onBeforeUnmount(() => resizeObserver?.disconnect())

  return { draw }
}
