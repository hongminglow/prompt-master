import { ensureGsap } from '../gsap'

export type HeroMotionOptions = {
  reducedMotion: boolean
}

export function attachHeroMotion(root: HTMLElement, options: HeroMotionOptions) {
  if (options.reducedMotion) return () => {}

  const { gsap } = ensureGsap()

  const ctx = gsap.context(() => {
    const eyebrow = root.querySelector<HTMLElement>('[data-anim="hero-eyebrow"]')
    const title = root.querySelector<HTMLElement>('[data-anim="hero-title"]')
    const subtitle = root.querySelector<HTMLElement>('[data-anim="hero-subtitle"]')
    const cta = root.querySelector<HTMLElement>('[data-anim="hero-cta"]')
    const canvas = root.querySelector<HTMLElement>('[data-anim="hero-canvas"]')

    const stack = [eyebrow, title, subtitle, cta].filter(Boolean)
    gsap.fromTo(
      stack,
      { y: 18, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.9, ease: 'power3.out', stagger: 0.08 },
    )

    if (canvas) {
      gsap.fromTo(
        canvas,
        { y: 14, scale: 0.98, autoAlpha: 0 },
        { y: 0, scale: 1, autoAlpha: 1, duration: 1.1, ease: 'expo.out', delay: 0.05 },
      )
    }
  }, root)

  return () => ctx.revert()
}
