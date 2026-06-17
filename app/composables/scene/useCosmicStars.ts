import * as THREE from 'three'

export function createCosmicStars(
  scene: THREE.Scene,
  opts: { count?: number; planeZ?: number; green: number; orange: number } = { green: 0xB9D42F, orange: 0xFF8B33 },
) {
  const STAR_COUNT = opts.count ?? 520
  const STAR_PLANE_Z = opts.planeZ ?? -4

  const positions = new Float32Array(STAR_COUNT * 3)
  const colors = new Float32Array(STAR_COUNT * 3)
  const sizes = new Float32Array(STAR_COUNT)
  const phases = new Float32Array(STAR_COUNT)
  const starBase = new Float32Array(STAR_COUNT * 3)
  const starOffset = new Float32Array(STAR_COUNT * 3)

  const white = new THREE.Color(0xfdfdff)
  const blueWhite = new THREE.Color(0xcfe0ff)
  const warm = new THREE.Color(0xfff0d6)
  const green = new THREE.Color(opts.green)
  const orange = new THREE.Color(opts.orange)

  for (let i = 0; i < STAR_COUNT; i++) {
    const x = (Math.random() - 0.5) * 34
    const y = (Math.random() - 0.5) * 22
    const z = STAR_PLANE_Z + (Math.random() - 0.5) * 3
    positions[i * 3] = starBase[i * 3] = x
    positions[i * 3 + 1] = starBase[i * 3 + 1] = y
    positions[i * 3 + 2] = starBase[i * 3 + 2] = z

    const r = Math.random()
    let c: THREE.Color
    if (r < 0.6) c = white
    else if (r < 0.78) c = blueWhite
    else if (r < 0.9) c = warm
    else if (r < 0.95) c = green
    else c = orange
    colors[i * 3] = c.r; colors[i * 3 + 1] = c.g; colors[i * 3 + 2] = c.b

    sizes[i] = 0.5 + Math.pow(Math.random(), 3) * 2.2

    phases[i] = Math.random() * Math.PI * 2 + Math.floor(Math.random() * 3) * 100
  }

  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geo.setAttribute('aColor', new THREE.BufferAttribute(colors, 3))
  geo.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1))
  geo.setAttribute('aPhase', new THREE.BufferAttribute(phases, 1))

  const material = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uOpacity: { value: 1 },
      uPixelRatio: { value: Math.min(window.devicePixelRatio || 1, 2) },
    },
    vertexShader: `
      attribute vec3 aColor;
      attribute float aSize;
      attribute float aPhase;
      uniform float uTime;
      uniform float uPixelRatio;
      varying vec3 vColor;
      varying float vTwinkle;
      void main() {
        vColor = aColor;
        float speed = 1.2 + mod(aPhase, 3.0) * 0.6;
        vTwinkle = 0.5 + 0.5 * sin(uTime * speed + aPhase);
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        float px = aSize * uPixelRatio * 6.0 * (0.85 + 0.25 * vTwinkle);
        gl_PointSize = clamp(px * (12.0 / -mv.z), 1.0, 9.0);
        gl_Position = projectionMatrix * mv;
      }
    `,
    fragmentShader: `
      uniform float uOpacity;
      varying vec3 vColor;
      varying float vTwinkle;
      void main() {
        float d = length(gl_PointCoord - vec2(0.5));
        float core = smoothstep(0.5, 0.0, d);
        float glow = pow(core, 3.5);
        float alpha = glow * uOpacity * (0.35 + 0.55 * vTwinkle);
        if (alpha < 0.01) discard;
        vec3 col = mix(vColor, vec3(1.0), pow(core, 6.0) * 0.6);
        gl_FragColor = vec4(col, alpha);
      }
    `,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  })

  const points = new THREE.Points(geo, material)
  scene.add(points)

  const starPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), -STAR_PLANE_Z)
  const cursorWorld = new THREE.Vector3()
  const raycaster = new THREE.Raycaster()
  const PUSH_RADIUS = 1.8
  const PUSH = 2.6

  function update(t: number, pointer: THREE.Vector2, camera: THREE.Camera) {
    raycaster.setFromCamera(pointer, camera)
    raycaster.ray.intersectPlane(starPlane, cursorWorld)
    const pos = points.geometry.attributes.position.array as Float32Array
    for (let i = 0; i < STAR_COUNT; i++) {
      const bx = starBase[i * 3], by = starBase[i * 3 + 1]
      const dx = bx - cursorWorld.x, dy = by - cursorWorld.y
      const dist = Math.hypot(dx, dy)
      let tx = 0, ty = 0
      if (dist < PUSH_RADIUS && dist > 0.0001) {
        const strength = (1 - dist / PUSH_RADIUS) * PUSH
        tx = (dx / dist) * strength
        ty = (dy / dist) * strength
      }
      starOffset[i * 3] += (tx - starOffset[i * 3]) * 0.12
      starOffset[i * 3 + 1] += (ty - starOffset[i * 3 + 1]) * 0.12
      const drift = Math.sin(t * 0.6 + i) * 0.05
      pos[i * 3] = bx + starOffset[i * 3]
      pos[i * 3 + 1] = by + starOffset[i * 3 + 1] + drift
    }
    points.geometry.attributes.position.needsUpdate = true
    material.uniforms.uTime.value = t
  }

  function dispose() {
    scene.remove(points)
    geo.dispose()
    material.dispose()
  }

  return { points, update, dispose }
}
