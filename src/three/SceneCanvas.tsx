import { Canvas } from '@react-three/fiber'
import { useMemo } from 'react'
import type { ComponentPropsWithoutRef } from 'react'
import type { OrbitArtifactControls } from './OrbitArtifact'
import { OrbitArtifact } from './OrbitArtifact'

export type { OrbitArtifactControls } from './OrbitArtifact'

type Variant = 'hero' | 'chapters'

type Props = Omit<ComponentPropsWithoutRef<'div'>, 'children'> & {
  variant?: Variant
  controls?: OrbitArtifactControls
}

export function SceneCanvas({
  className,
  variant = 'hero',
  controls,
  ...divProps
}: Props) {
  const camera =
    variant === 'hero'
      ? ({ fov: 38, position: [0, 0, 3.1] } as const)
      : ({ fov: 34, position: [0, 0, 2.95] } as const)

  const localControls = useMemo<OrbitArtifactControls>(
    () => ({
      spin: variant === 'hero' ? 0.28 : 0.2,
      glow: variant === 'hero' ? 0.18 : 0.2,
      deform: variant === 'hero' ? 0.3 : 0.22,
      progress: 0,
    }),
    [variant],
  )

  const merged = controls ?? localControls

  return (
    <div className={className} {...divProps}>
      <Canvas
        dpr={[1, 1.5]}
        camera={camera}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={0.65} />
        <directionalLight position={[3.5, 2.2, 4]} intensity={1.25} />
        <directionalLight position={[-3.2, -2.1, 2]} intensity={0.6} />
        <pointLight position={[0, 1.2, 2.3]} intensity={1.3} />
        <OrbitArtifact controls={merged} />
      </Canvas>
    </div>
  )
}
