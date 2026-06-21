import * as THREE from 'three'
import { makeGlowTexture } from '~/composables/scene/glowTexture'

interface Comet {
  group: THREE.Group
  head: THREE.Sprite
  trail: THREE.Sprite[]
  dir: THREE.Vector3
  life: number
  speed: number
}

export function createCometSystem(
  scene: THREE.Scene,
  opts: { green: number; orange: number } = { green: 0xB9D42F, orange: 0xFF8B33 },
) {
  const COMET_TRAIL = 14
  const comets: Comet[] = []
  // one shared glow texture for every comet (was recreated on each spawn -> GPU upload spam)
  const cometTex = makeGlowTexture()

  function spawn(origin: THREE.Vector3) {
    const color = Math.random() < 0.5 ? opts.green : opts.orange
    const group = new THREE.Group()

    const ang = (Math.random() - 0.5) * 1.6 + (Math.random() < 0.5 ? 0 : Math.PI)
    const dir = new THREE.Vector3(Math.cos(ang), Math.sin(ang) * 0.5, 0).normalize()

    const head = new THREE.Sprite(new THREE.SpriteMaterial({
      map: cometTex, color: new THREE.Color(color).multiplyScalar(2.2),
      transparent: true, blending: THREE.AdditiveBlending, depthWrite: false,
    }))
    head.scale.setScalar(0.22)
    head.position.copy(origin)
    group.add(head)

    const trail: THREE.Sprite[] = []
    for (let i = 0; i < COMET_TRAIL; i++) {
      const s = new THREE.Sprite(new THREE.SpriteMaterial({
        map: cometTex, color, transparent: true,
        opacity: (1 - i / COMET_TRAIL) * 0.55,
        blending: THREE.AdditiveBlending, depthWrite: false,
      }))
      s.scale.setScalar(0.18 * (1 - i / COMET_TRAIL) + 0.04)
      s.position.copy(origin)
      group.add(s)
      trail.push(s)
    }

    scene.add(group)
    comets.push({ group, head, trail, dir, life: 0, speed: 9 })
  }

  function update(dt: number) {
    for (let i = comets.length - 1; i >= 0; i--) {
      const c = comets[i]
      c.life += dt
      c.head.position.addScaledVector(c.dir, c.speed * dt)

      let prev = c.head.position
      for (const s of c.trail) {
        s.position.lerp(prev, 0.35)
        prev = s.position
      }
      const k = Math.max(0, 1 - c.life / 1.6)
      c.head.material.opacity = k
      for (let j = 0; j < c.trail.length; j++) {
        c.trail[j].material.opacity = (1 - j / c.trail.length) * 0.6 * k
      }
      if (c.life > 1.6) {
        scene.remove(c.group)
        // dispose only the materials — the texture is shared, disposed once in dispose()
        c.group.traverse((o) => {
          const mat = (o as THREE.Sprite).material as THREE.SpriteMaterial | undefined
          if (mat) mat.dispose()
        })
        comets.splice(i, 1)
      }
    }
  }

  function dispose() {
    for (const c of comets) {
      scene.remove(c.group)
      c.group.traverse((o) => {
        const mat = (o as THREE.Sprite).material as THREE.SpriteMaterial | undefined
        if (mat) mat.dispose()
      })
    }
    comets.length = 0
    cometTex.dispose()
  }

  return { spawn, update, dispose }
}
