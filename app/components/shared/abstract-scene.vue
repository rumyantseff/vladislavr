<template>
  <div ref="container" class="abstract-scene" aria-hidden="true" />
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'
import { usePageStack } from '~/composables/usePageStack'
import { createCosmicStars } from '~/composables/scene/useCosmicStars'
import { createCometSystem } from '~/composables/scene/useCometSystem'
import { knotGlassMat, knotPoint, makeQuantum, KNOT_R, KNOT_P, KNOT_Q } from '~/composables/scene/sceneFactories'

const container = ref(null)

const { scrollProgress, knotVisible } = usePageStack()
let knotShow = 0

const GREEN = 0xB9D42F
const ORANGE = 0xFF8B33

let renderer, scene, camera, raf, resizeObserver
let composer, bloomPass, clock
let altarBeam = null
let centerKnot = null
let knotMount = null
let greenQuantum = null
const knotPos = new THREE.Vector3()

let starField = null
let cometSystem = null
// perf: cached viewport flag (avoid window.innerWidth per frame) + render gating state
let isMobile = false
let hidden = false
const STAR_PLANE_Z = -4
const pointer = new THREE.Vector2(-10, -10)
const cursorWorld = new THREE.Vector3()
const raycaster = new THREE.Raycaster()
const starPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), -STAR_PLANE_Z)
function onPointerMove(e) {
  pointer.x = (e.clientX / window.innerWidth) * 2 - 1
  pointer.y = -((e.clientY / window.innerHeight) * 2 - 1)
  if (dragging) {
    knotDragVel += (e.clientX - dragLastX) * 0.0012
    knotDragVel = Math.max(-MAX_DRAG_VEL, Math.min(MAX_DRAG_VEL, knotDragVel))
    dragLastX = e.clientX
  }
}

let dragging = false
let dragLastX = 0
let knotDragVel = 0
const MAX_DRAG_VEL = 0.05

function onPointerDown(e) {
  pointer.x = (e.clientX / window.innerWidth) * 2 - 1
  pointer.y = -((e.clientY / window.innerHeight) * 2 - 1)
  raycaster.setFromCamera(pointer, camera)

  const hit = centerKnot && raycaster.intersectObject(centerKnot, true).length > 0
  if (hit) {
    dragging = true
    dragLastX = e.clientX
    knotDragVel = 0
  } else if (isSkyClick(e.target)) {
    raycaster.ray.intersectPlane(starPlane, cursorWorld)
    cometSystem?.spawn(cursorWorld)
  }
}

// a comet only spawns on the empty dark "sky" — not when clicking the header, nav links,
// cards, panels, text, buttons or any other content sitting on top. Empty layout wrappers
// (which have no text of their own) count as sky; the HELLO watermark also counts.
const SKY_DENY = 'a, button, input, select, textarea, label, [role="button"],' +
  ' [data-page-stack-nav], .intro-card, [data-testid^="service-card"], [data-testid^="project-card"],' +
  ' h1, h2, h3, h4, h5, h6, p, [class*="bg-white/5"], [class*="bg-brand-50"], [class*="bg-brand-950/"]'

function isSkyClick(target) {
  if (!(target instanceof Element)) return false
  if (target.closest(SKY_DENY)) return false
  // a wrapper that directly holds visible text is content, not sky
  const txt = target.textContent
  if (target.childElementCount === 0 && txt && txt.trim().length > 0) return false
  return true
}
function onPointerUp() {
  dragging = false
}

const reducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

function init() {
  const el = container.value
  const width = el.clientWidth || window.innerWidth
  const height = el.clientHeight || window.innerHeight

  scene = new THREE.Scene()
  scene.background = null
  scene.fog = new THREE.FogExp2(0x040406, 0.03)

  camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100)
  camera.position.set(0, 0, 13)
  camera.lookAt(0, 0, 0)

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2.5))
  renderer.setSize(width, height)
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.0
  el.appendChild(renderer.domElement)

  const pmrem = new THREE.PMREMGenerator(renderer)
  const envScene = new RoomEnvironment()
  const panel = (color, intensity, pos, size) => {
    const m = new THREE.Mesh(
      new THREE.PlaneGeometry(size, size),
      new THREE.MeshBasicMaterial({ color, side: THREE.DoubleSide }),
    )
    m.material.color.multiplyScalar(intensity)
    m.position.set(...pos)
    m.lookAt(0, 0, 0)
    envScene.add(m)
  }
  panel(0xffffff, 4, [-8, 6, 6], 10)
  panel(0xB9D42F, 2, [9, 3, 4], 8)
  panel(0x1A0B00, 2, [4, -7, 6], 8)
  scene.environment = pmrem.fromScene(envScene, 0.02).texture
  scene.environmentIntensity = 1.3

  composer = new EffectComposer(renderer)
  composer.addPass(new RenderPass(scene, camera))

  bloomPass = new UnrealBloomPass(new THREE.Vector2(width, height), 0.25, 0.5, 0.8)
  composer.addPass(bloomPass)

  clock = new THREE.Clock()

  addLights()
  addObjects()
  applyResponsive()

  window.addEventListener('mousemove', onPointerMove, { passive: true })
  window.addEventListener('mousedown', onPointerDown)
  window.addEventListener('mouseup', onPointerUp)
  document.addEventListener('visibilitychange', onVisibility)
}

// pause the render loop while the tab is in the background; resume on return
function onVisibility() {
  hidden = document.hidden
  if (!hidden && !raf) { lastT = clock.getElapsedTime(); animate() }
}

function addLights() {
  scene.add(new THREE.AmbientLight(0xffffff, 0.2))

  const gRim = new THREE.PointLight(GREEN, 60, 50)
  gRim.position.set(-8, 2, 3)
  scene.add(gRim)

  const oRim = new THREE.PointLight(ORANGE, 55, 50)
  oRim.position.set(8, -2, 3)
  scene.add(oRim)

  const key = new THREE.DirectionalLight(0xffffff, 0.5)
  key.position.set(0, 6, -4)
  scene.add(key)

  const fill = new THREE.DirectionalLight(0xffffff, 0.3)
  fill.position.set(0, -2, 8)
  scene.add(fill)
}

function addObjects() {

  knotMount = new THREE.Group()
  knotMount.position.set(0, 0, -2)
  knotMount.rotation.x = Math.PI / 2
  knotMount.scale.setScalar(2.8)
  scene.add(knotMount)

  centerKnot = new THREE.Mesh(
    new THREE.TorusKnotGeometry(KNOT_R, 0.22, 220, 32, KNOT_P, KNOT_Q),
    knotGlassMat(),
  )
  knotMount.add(centerKnot)

  const copperVein = new THREE.Mesh(
    new THREE.TorusKnotGeometry(KNOT_R, 0.07, 220, 32, KNOT_P, KNOT_Q),
    new THREE.MeshPhysicalMaterial({
      color: 0xC2702E, metalness: 1, roughness: 0.22,
      clearcoat: 1, clearcoatRoughness: 0.08,
      envMapIntensity: 1.6,
    }),
  )
  centerKnot.add(copperVein)

  greenQuantum = makeQuantum(GREEN)
  centerKnot.add(greenQuantum)

  // fewer stars on mobile (imperceptible on a small display, much cheaper per frame)
  const starCount = window.innerWidth < 1024 ? 260 : 520
  starField = createCosmicStars(scene, { count: starCount, green: GREEN, orange: ORANGE, planeZ: STAR_PLANE_Z })
  cometSystem = createCometSystem(scene, { green: GREEN, orange: ORANGE })
  addAltarBeam()
}

let beamGroup = null

function addAltarBeam() {
  const beam = new THREE.Group()
  beam.position.set(0, 0, -2)
  scene.add(beam)
  beamGroup = beam

  const core = new THREE.Mesh(
    new THREE.CylinderGeometry(0.3, 0.55, 22, 64, 1, true),
    new THREE.MeshBasicMaterial({
      color: 0xffffff, transparent: true, opacity: 1,
      blending: THREE.AdditiveBlending, side: THREE.DoubleSide, depthWrite: false,
    }),
  )
  beam.add(core)

  const hot = new THREE.Mesh(
    new THREE.CylinderGeometry(0.12, 0.22, 22, 32, 1, true),
    new THREE.MeshBasicMaterial({
      color: 0xffffff, transparent: true, opacity: 1,
      blending: THREE.AdditiveBlending, side: THREE.DoubleSide, depthWrite: false,
    }),
  )
  beam.add(hot)

  altarBeam = { core, hot }
}

function applyResponsive() {
  const mobile = window.innerWidth < 1024
  isMobile = mobile // cache so the animate loop doesn't read window.innerWidth per frame
  if (camera) {
    camera.position.z = mobile ? 18 : 13
    camera.position.y = mobile ? 2.5 : 0
  }
  if (beamGroup) {
    beamGroup.scale.x = mobile ? 0.5 : 1
  }
  if (altarBeam) {

    altarBeam.coreMax = mobile ? 0.85 : 1
    altarBeam.hotMax = mobile ? 0.9 : 1
  }
  // adaptive quality on mobile (desktop untouched): lighter pixel ratio + half-res bloom
  if (renderer) {
    const dpr = window.devicePixelRatio || 1
    renderer.setPixelRatio(Math.min(dpr, mobile ? 1.75 : 2.5))
  }
  if (bloomPass && container.value) {
    const w = container.value.clientWidth, h = container.value.clientHeight
    const s = mobile ? 0.5 : 1
    bloomPass.setSize(Math.max(1, Math.round(w * s)), Math.max(1, Math.round(h * s)))
  }
}

let lastT = 0
function animate() {
  // pause entirely when the tab is hidden (no rendering off-screen)
  if (hidden) { raf = 0; return }
  raf = requestAnimationFrame(animate)

  // the scene only shows through Home + (glass) About; on Projects/Contact the page is
  // opaque on top, so skip ALL per-frame work + render once we're past About.
  const visible = scrollProgress.value < 1.6
  if (!visible) {
    // A multi-step jump (e.g. Home -> Contact) eases the knot out only halfway before the
    // dwell teleports scrollProgress past this gate, freezing the knot mid-fade — it would
    // then sit partially visible at the top of Projects/Contact while the target page eases
    // in. Snap it fully hidden and render that one last frame so the canvas actually clears
    // the stale knot (after that we go back to skipping render while off-screen).
    if (knotShow !== 0) {
      knotShow = 0
      if (knotMount) knotMount.visible = false
      knotVisible.value = 0
      composer.render()
    }
    return
  }

  const t = clock.getElapsedTime()
  const dt = Math.min(t - lastT, 0.05)
  lastT = t

  const interactive = !reducedMotion()

  cometSystem?.update(dt)

  starField?.update(t, pointer, camera)

  if (greenQuantum) {
    const u = -t * 0.9
    knotPoint(u, knotPos)
    greenQuantum.position.copy(knotPos)

    const glow = greenQuantum.userData.glow
    const f = t * 9
    const flickerIn = 0.85 + Math.sin(f) * 0.12 + Math.sin(f * 2.3) * 0.06
    const flickerOut = 0.8 + Math.sin(f * 0.7 + 1.5) * 0.2 + Math.sin(f * 1.7) * 0.08
    glow.inner.scale.setScalar(glow.baseInner * flickerIn)
    glow.outer.scale.setScalar(glow.baseOuter * flickerOut)
    glow.inner.material.opacity = 0.9 * (0.8 + Math.sin(f * 1.3) * 0.2)
    glow.outer.material.opacity = 0.45 * (0.75 + Math.sin(f * 0.9 + 0.5) * 0.25)
  }

  if (centerKnot) {
    const idle = interactive ? 0.006 : 0
    centerKnot.rotation.z += idle + knotDragVel
    if (!dragging) knotDragVel *= 0.92
  }

  if (knotMount) {
    const sp = scrollProgress.value
    if (sp > 0.85) {
      knotShow = 0
    } else {
      const target = sp > 0.05 ? 0 : 1
      knotShow += (target - knotShow) * 0.04

      if (target === 0 && knotShow < 0.003) knotShow = 0
      if (target === 1 && knotShow > 0.98) knotShow = 1
    }
    const mobile = isMobile

    const base = (mobile ? 2.8 * 0.58 : 2.8)
    const restY = mobile ? 3.2 : 0
    const RISE = mobile ? 14 : 16
    knotMount.scale.setScalar(base)
    knotMount.position.y = restY + (1 - knotShow) * RISE

    knotMount.visible = knotShow > 0.015
    knotVisible.value = knotShow
  }

  if (altarBeam) {
    const coreMax = altarBeam.coreMax ?? 1
    const hotMax = altarBeam.hotMax ?? 1
    altarBeam.core.material.opacity = (0.85 + Math.sin(t * 1.6) * 0.15) * coreMax
    altarBeam.hot.material.opacity = (0.9 + Math.sin(t * 1.6) * 0.1) * hotMax
  }

  composer.render()
}

function onResize() {
  const el = container.value
  if (!el || !renderer || !camera) return
  const width = el.clientWidth
  const height = el.clientHeight
  camera.aspect = width / height
  camera.updateProjectionMatrix()
  renderer.setSize(width, height)
  composer?.setSize(width, height)
  applyResponsive() // sets pixelRatio + bloom resolution (adaptive on mobile)
}

function dispose() {
  cancelAnimationFrame(raf)
  resizeObserver?.disconnect()
  window.removeEventListener('mousemove', onPointerMove)
  window.removeEventListener('mousedown', onPointerDown)
  window.removeEventListener('mouseup', onPointerUp)
  document.removeEventListener('visibilitychange', onVisibility)
  starField?.dispose()
  cometSystem?.dispose()
  scene?.traverse((obj) => {
    if (obj.geometry) obj.geometry.dispose()
    if (obj.material) {
      const mats = Array.isArray(obj.material) ? obj.material : [obj.material]
      mats.forEach((m) => m.dispose())
    }
  })
  composer?.dispose?.()
  renderer?.dispose()
  if (renderer?.domElement && container.value?.contains(renderer.domElement)) {
    container.value.removeChild(renderer.domElement)
  }
}

onMounted(() => {
  init()
  animate()
  resizeObserver = new ResizeObserver(onResize)
  resizeObserver.observe(container.value)
})

onBeforeUnmount(dispose)
</script>

<style scoped>
.abstract-scene {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.abstract-scene :deep(canvas) {
  display: block;
}
</style>
