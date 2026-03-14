import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import type { Mesh, MeshPhysicalMaterial } from 'three'
import { Color, IcosahedronGeometry } from 'three'
import { auroraMaterial } from './materials/auroraMaterial'

export type OrbitArtifactControls = {
  spin: number
  glow: number
  deform: number
  progress: number
}

type Props = {
  controls: OrbitArtifactControls
}

export function OrbitArtifact({ controls }: Props) {
  const meshRef = useRef<Mesh | null>(null)

  const geometry = useMemo(() => new IcosahedronGeometry(1, 5), [])
  const emissive = useMemo(() => new Color('#7c5cff'), [])

  useFrame(({ clock, pointer }, delta) => {
    const mesh = meshRef.current
    if (!mesh) return

    const t = clock.getElapsedTime()
    const spin = Math.max(0, controls.spin)
    const deform = Math.max(0, controls.deform)
    const glow = Math.max(0, controls.glow)

    mesh.rotation.y += delta * (0.22 + spin * 0.95)
    mesh.rotation.x += delta * (0.12 + spin * 0.55)
    mesh.rotation.y += pointer.x * delta * 0.35
    mesh.rotation.x += -pointer.y * delta * 0.25
    mesh.rotation.z = Math.sin(t * 0.15) * 0.08

    const wobble = 1 + Math.sin(t * 1.15 + controls.progress * Math.PI * 2) * 0.03
    mesh.scale.setScalar(1 + deform * (wobble - 1))

    const material = mesh.material as MeshPhysicalMaterial | undefined
    if (material) {
      material.emissive = emissive
      material.emissiveIntensity = 0.12 + glow * 0.9
    }
  })

  return (
    <mesh ref={meshRef} geometry={geometry} castShadow receiveShadow>
      <meshPhysicalMaterial {...auroraMaterial} />
    </mesh>
  )
}
