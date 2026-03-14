import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import type { Mesh, MeshPhysicalMaterial, BufferAttribute } from 'three'
import { Color, IcosahedronGeometry, Vector3 } from 'three'
import { auroraMaterial } from './materials/auroraMaterial'

export type OrbitArtifactControls = {
  spin: number
  glow: number
  deform: number
  progress: number
}

type Props = {
  controls: OrbitArtifactControls
  heroScrollProgress?: number
}

const temp = new Vector3()

export function OrbitArtifact({ controls, heroScrollProgress = 0 }: Props) {
  const meshRef = useRef<Mesh | null>(null)
  const originalPositions = useRef<Float32Array | null>(null)

  const geometry = useMemo(() => {
    const geo = new IcosahedronGeometry(1, 5)
    return geo
  }, [])

  /* Store original vertex positions for displacement */
  useMemo(() => {
    const pos = geometry.getAttribute('position') as BufferAttribute
    originalPositions.current = new Float32Array(pos.array)
  }, [geometry])

  const emissiveBase = useMemo(() => new Color('#7c5cff'), [])
  const emissiveHot = useMemo(() => new Color('#56a8ff'), [])
  const emissiveBlend = useMemo(() => new Color(), [])

  useFrame(({ clock, pointer }, delta) => {
    const mesh = meshRef.current
    if (!mesh) return

    const t = clock.getElapsedTime()
    const spin = Math.max(0, controls.spin)
    const deform = Math.max(0, controls.deform)
    const glow = Math.max(0, controls.glow)

    /* ─── Rotation with mouse parallax ─── */
    mesh.rotation.y += delta * (0.18 + spin * 0.7)
    mesh.rotation.x += delta * (0.1 + spin * 0.4)
    mesh.rotation.y += pointer.x * delta * 0.45
    mesh.rotation.x += -pointer.y * delta * 0.35
    mesh.rotation.z = Math.sin(t * 0.12) * 0.06

    /* ─── Vertex displacement for organic breathing / morphing ─── */
    const pos = geometry.getAttribute('position') as BufferAttribute
    const orig = originalPositions.current
    if (orig) {
      const arr = pos.array as Float32Array
      const breathe = Math.sin(t * 0.6) * 0.03
      const pulse = Math.sin(t * 1.8 + controls.progress * Math.PI * 4) * 0.015
      const scrollFactor = heroScrollProgress * 0.08

      for (let i = 0; i < arr.length; i += 3) {
        temp.set(orig[i], orig[i + 1], orig[i + 2])
        const len = temp.length()
        temp.normalize()

        // Per-vertex noise-like displacement using vertex angle
        const angle = Math.atan2(temp.y, temp.x)
        const phi = Math.acos(temp.z)
        const noiseVal =
          Math.sin(angle * 3 + t * 0.5) * 0.018 +
          Math.sin(phi * 5 + t * 0.7) * 0.015 +
          Math.sin(angle * 7 - t * 0.3 + phi * 2) * 0.008

        const displacement = (breathe + pulse + noiseVal + scrollFactor) * deform * 3

        arr[i] = orig[i] + temp.x * displacement * len
        arr[i + 1] = orig[i + 1] + temp.y * displacement * len
        arr[i + 2] = orig[i + 2] + temp.z * displacement * len
      }
      pos.needsUpdate = true
      geometry.computeVertexNormals()
    }

    /* ─── Scale based on scroll progress ─── */
    const scrollScale = 1 + heroScrollProgress * 0.15
    const wobble = 1 + Math.sin(t * 1.15 + controls.progress * Math.PI * 2) * 0.03
    mesh.scale.setScalar(scrollScale * (1 + deform * (wobble - 1)))

    /* ─── Emissive glow that shifts with scroll ─── */
    const material = mesh.material as MeshPhysicalMaterial | undefined
    if (material) {
      emissiveBlend.copy(emissiveBase).lerp(emissiveHot, heroScrollProgress * 0.6)
      material.emissive = emissiveBlend
      material.emissiveIntensity = 0.12 + glow * 0.9 + heroScrollProgress * 0.4
      material.iridescence = 0.45 + heroScrollProgress * 0.35
      material.clearcoat = 1 + heroScrollProgress * 0.2
    }
  })

  return (
    <mesh ref={meshRef} geometry={geometry} castShadow receiveShadow>
      <meshPhysicalMaterial {...auroraMaterial} />
    </mesh>
  )
}
