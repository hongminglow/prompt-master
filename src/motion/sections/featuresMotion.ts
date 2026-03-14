import { ensureGsap } from '../gsap'

export type FeaturesMotionOptions = {
  reducedMotion: boolean
}

export function attachFeaturesMotion(root: HTMLElement, options: FeaturesMotionOptions) {
  if (options.reducedMotion) return () => {}

  const { gsap } = ensureGsap()

  const ctx = gsap.context(() => {
    const cards = gsap.utils.toArray<HTMLElement>('[data-anim="feature-card"]', root)
    if (cards.length === 0) return

    gsap.fromTo(
      cards,
      { y: 18, autoAlpha: 0 },
      {
        y: 0,
        autoAlpha: 1,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.08,
        scrollTrigger: {
          trigger: root,
          start: 'top 75%',
          once: true,
        },
      },
    )
  }, root)

  return () => ctx.revert()
}
