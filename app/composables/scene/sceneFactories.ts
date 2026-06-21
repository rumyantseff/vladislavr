import * as THREE from 'three'
import { makeGlowTexture } from '~/composables/scene/glowTexture'

export const KNOT_R = 1.6
export const KNOT_P = 2
export const KNOT_Q = 3

export function knotGlassMat(): THREE.MeshPhysicalMaterial {
  return new THREE.MeshPhysicalMaterial({
    color: 0xffffff, metalness: 0, roughness: 0,
    transmission: 1, thickness: 1.2, transparent: true,
    opacity: 0.42,
    ior: 1.6, dispersion: 2,
    clearcoat: 0.5, clearcoatRoughness: 0.1,
    reflectivity: 0.4, specularIntensity: 0.5,
    envMapIntensity: 0.4,
    attenuationDistance: 12,
    flatShading: true,
  })
}

export function knotPoint(u: number, target: THREE.Vector3): THREE.Vector3 {
  const cu = Math.cos(u), su = Math.sin(u)
  const quOverP = (KNOT_Q / KNOT_P) * u
  const cs = Math.cos(quOverP)
  target.set(
    KNOT_R * (2 + cs) * 0.5 * cu,
    KNOT_R * (2 + cs) * 0.5 * su,
    KNOT_R * Math.sin(quOverP) * 0.5,
  )
  return target
}

export function makeQuantum(color: number): THREE.Group {
  const glowTex = makeGlowTexture()
  const g = new THREE.Group()

  const core = new THREE.Mesh(
    new THREE.SphereGeometry(0.09, 16, 16),
    new THREE.MeshBasicMaterial({
      color: 0xffffff, blending: THREE.AdditiveBlending, depthWrite: false, depthTest: false,
    }),
  )
  core.renderOrder = 10
  g.add(core)

  const sprite = (size: number, opacity: number) => {
    const s = new THREE.Sprite(new THREE.SpriteMaterial({
      map: glowTex, color, transparent: true, opacity,
      blending: THREE.AdditiveBlending, depthWrite: false, depthTest: false,
    }))
    s.scale.setScalar(size)
    s.renderOrder = 11
    g.add(s)
    return s
  }
  const inner = sprite(0.9, 0.9)
  const outer = sprite(1.8, 0.45)
  g.userData.glow = { inner, outer, baseInner: 0.9, baseOuter: 1.8 }
  return g
}
