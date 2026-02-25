"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

// ─── Tweak these to adjust the look ───
const CONFIG = {
  gridSize: 256,
  waveSpeed: 0.22,
  waveAmplitude: 0.6,
  waveFrequency: 1.6,
}
// ───────────────────────────────────────

function smoothNoise(x: number, y: number): number {
  return (
    Math.sin(x * 0.7 + y * 0.5) * 0.5 +
    Math.sin(x * 0.3 + y * 1.1) * 0.3 +
    Math.sin(x * 1.3 - y * 0.4) * 0.2
  )
}

export function SilkBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<number>(0)

  useEffect(() => {
    if (!containerRef.current) return
    const container = containerRef.current

    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0xfafbfd)

    scene.fog = new THREE.FogExp2(0xfafbfd, 0.08)

    const camera = new THREE.PerspectiveCamera(
      40,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    )
    camera.position.set(0, 3.5, 4)
    camera.lookAt(0, 0, -1)

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    // @ts-ignore - colorSpace property exists but may not be in types
    renderer.outputColorSpace = "srgb"
    renderer.toneMapping = THREE.LinearToneMapping
    renderer.toneMappingExposure = 1.8
    container.appendChild(renderer.domElement)

    // Lighting — soft lavender/rose tint for dreamy feel
    const ambient = new THREE.HemisphereLight(0xffffff, 0xf5f3f8, 0.8)
    scene.add(ambient)

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.0)
    keyLight.position.set(-5, 3, 3)
    scene.add(keyLight)

    const fillLight = new THREE.DirectionalLight(0xf8f6ff, 0.6)
    fillLight.position.set(4, 6, -3)
    scene.add(fillLight)

    // ─── Cloth ───
    const geo = new THREE.PlaneGeometry(30, 24, CONFIG.gridSize, CONFIG.gridSize)
    geo.rotateX(-Math.PI / 2)

    const mat = new THREE.MeshPhysicalMaterial({
      color: 0xf0eff4,
      roughness: 0.7,
      metalness: 0.0,
      sheen: 0.5,
      sheenRoughness: 0.4,
      sheenColor: new THREE.Color(0xffffff),
      clearcoat: 0.05,
      clearcoatRoughness: 0.8,
      side: THREE.FrontSide,
    })

    const mesh = new THREE.Mesh(geo, mat)
    mesh.position.y = -0.3
    scene.add(mesh)

    const pos = geo.attributes.position.array as Float32Array
    const restY = new Float32Array(pos.length / 3)
    for (let i = 0; i < pos.length / 3; i++) {
      restY[i] = pos[i * 3 + 1]
    }

    // ─── Sunlit dust motes ───
    const dustCount = 100
    const dustGeo = new THREE.BufferGeometry()
    const dustPos = new Float32Array(dustCount * 3)
    const dustSizes = new Float32Array(dustCount)
    const dustSpeeds = new Float32Array(dustCount)
    const dustPhase = new Float32Array(dustCount)

    for (let i = 0; i < dustCount; i++) {
      dustPos[i * 3] = (Math.random() - 0.5) * 8       // x: spread across view
      dustPos[i * 3 + 1] = 0.5 + Math.random() * 3     // y: between cloth and camera height
      dustPos[i * 3 + 2] = -2 + Math.random() * 6       // z: between cloth and camera
      dustSizes[i] = 0.03 + Math.random() * 0.06
      dustSpeeds[i] = 0.2 + Math.random() * 0.8
      dustPhase[i] = Math.random() * Math.PI * 2
    }

    dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPos, 3))
    dustGeo.setAttribute("size", new THREE.BufferAttribute(dustSizes, 1))

    // Custom shader for soft glowing circles instead of squares
    const dustMat = new THREE.ShaderMaterial({
      uniforms: {
        uColor: { value: new THREE.Color(0xd4a574) },  // warm gold
        uTime: { value: 0 },
      },
      vertexShader: `
        attribute float size;
        varying float vAlpha;
        void main() {
          vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (400.0 / -mvPos.z);
          gl_Position = projectionMatrix * mvPos;
          // Fade based on distance for depth
          vAlpha = smoothstep(20.0, 2.0, -mvPos.z);
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        varying float vAlpha;
        void main() {
          float d = length(gl_PointCoord - vec2(0.5));
          if (d > 0.5) discard;  // clip to circle
          float glow = exp(-d * 4.0);
          float alpha = glow * vAlpha * 0.45;
          gl_FragColor = vec4(uColor, alpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })

    const dustParticles = new THREE.Points(dustGeo, dustMat)
    scene.add(dustParticles)

    // ─── Animation ───
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate)
      const t = performance.now() * 0.001 * CONFIG.waveSpeed
      const amp = CONFIG.waveAmplitude
      const freq = CONFIG.waveFrequency
      const count = pos.length / 3

      // Cloth animation
      for (let i = 0; i < count; i++) {
        const x = pos[i * 3]
        const z = pos[i * 3 + 2]

        const wx = x + smoothNoise(x * 0.3 + t * 0.2, z * 0.4) * 1.8
            + Math.sin(z * 0.15 + t * 0.1) * 0.8
        const wz = z + smoothNoise(z * 0.3 - t * 0.15, x * 0.35) * 1.5
            + Math.sin(x * 0.2 - t * 0.08) * 0.7

        const windAngle = x * 0.4 - z * 0.3
        const d = wx + wz
        const f1 = (1 - Math.cos(d * freq * 0.6 + t + windAngle * 0.15)) * 0.5 * amp
        const f2 = (1 - Math.cos(d * freq * 1.1 + t * 1.3 + windAngle * 0.1)) * 0.5 * amp * 0.35
        const f3 = Math.sin(d * freq * 1.7 - t * 0.9 + windAngle * 0.08) * amp * 0.15

        const c = wx - wz
        const f4 = (1 - Math.cos(c * freq * 0.35 + t * 0.6 + windAngle * 0.12)) * 0.5 * amp * 0.18

        const drift = Math.sin(x * 0.2 + z * 0.15 + t * 1.5) * amp * 0.08

        pos[i * 3 + 1] = restY[i] + f1 + f2 + f3 + f4 + drift
      }

      geo.attributes.position.needsUpdate = true
      geo.computeVertexNormals()

      // Dust mote animation — slow elegant drift
      const rawTime = performance.now() * 0.001
      dustMat.uniforms.uTime.value = rawTime
      const dArr = dustGeo.attributes.position.array as Float32Array
      for (let i = 0; i < dustCount; i++) {
        const spd = dustSpeeds[i] * 0.0015
        const ph = dustPhase[i]

        dArr[i * 3 + 1] += spd  // very slow rise
        dArr[i * 3] += Math.sin(rawTime * 0.15 + ph) * 0.003  // slow lazy sway
        dArr[i * 3 + 2] += Math.cos(rawTime * 0.1 + ph * 1.3) * 0.002
        dArr[i * 3] += Math.sin(rawTime * 0.08 + ph * 2.1) * 0.001  // figure-8

        if (dArr[i * 3 + 1] > 4) {
          dArr[i * 3] = (Math.random() - 0.5) * 8
          dArr[i * 3 + 1] = 0.3
          dArr[i * 3 + 2] = -2 + Math.random() * 6
        }
      }
      dustGeo.attributes.position.needsUpdate = true

      renderer.render(scene, camera)
    }
    animate()

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener("resize", onResize)

    return () => {
      cancelAnimationFrame(frameRef.current)
      window.removeEventListener("resize", onResize)
      renderer.dispose()
      geo.dispose()
      mat.dispose()
      dustGeo.dispose()
      dustMat.dispose()
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1,
        pointerEvents: "none",
      }}
    />
  )
}
