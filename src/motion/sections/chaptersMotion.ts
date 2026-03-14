import { ensureGsap } from '../gsap'
import type { OrbitArtifactControls } from '../../three/SceneCanvas'

export type ChaptersMotionOptions = {
  isTouch: boolean
  reducedMotion: boolean
  controls: OrbitArtifactControls
}

export function attachChaptersMotion(root: HTMLElement, options: ChaptersMotionOptions) {
  if (options.reducedMotion || options.isTouch) return () => {}

  const { gsap } = ensureGsap()

  const ctx = gsap.context(() => {
    const stage = root.querySelector<HTMLElement>('[data-chapters-stage]')
    const progress = root.querySelector<HTMLElement>('[data-chapters-progress]')
    const panels = gsap.utils.toArray<HTMLElement>('[data-chapter-panel]', root)

    if (!stage || !progress || panels.length === 0) return

    const total = panels.length
    const states = [
      { spin: 0.14, glow: 0.14, deform: 0.18 }, // Reveal
      { spin: 0.22, glow: 0.28, deform: 0.44 }, // Explain
      { spin: 0.1, glow: 0.44, deform: 0.22 }, // Convert
    ]

    const mm = gsap.matchMedia()
    mm.add('(min-width: 768px)', () => {
      gsap.set(panels, { autoAlpha: 0, y: 12 })
      gsap.set(panels[0], { autoAlpha: 1, y: 0 })
      gsap.set(progress, { transformOrigin: 'top', scaleY: 1 / total })

      Object.assign(options.controls, states[0] ?? {})

      const tl = gsap.timeline({
        defaults: { ease: 'power2.out' },
        scrollTrigger: {
          trigger: stage,
          start: 'top top+=120',
          end: () => `+=${Math.round(window.innerHeight * total)}`,
          scrub: 1,
          pin: stage,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            options.controls.progress = self.progress
          },
        },
      })

      for (let i = 0; i < total; i += 1) {
        const at = i
        const state = states[i] ?? states[states.length - 1]!

        tl.to(options.controls, { ...state, duration: 1 }, at)
        tl.to(progress, { scaleY: (i + 1) / total, duration: 1 }, at)

        if (i === 0) continue
        tl.to(panels[i - 1], { autoAlpha: 0, y: -8, duration: 0.35 }, at)
        tl.fromTo(
          panels[i],
          { autoAlpha: 0, y: 14 },
          { autoAlpha: 1, y: 0, duration: 0.45 },
          at + 0.1,
        )
      }

      return () => {
        tl.kill()
      }
    })

    return () => {
      mm.kill()
    }
  }, root)

  return () => ctx.revert()
}
