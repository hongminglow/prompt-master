import { ensureGsap } from '../gsap'

export type HeroMotionOptions = {
  reducedMotion: boolean
}

export function attachHeroMotion(root: HTMLElement, options: HeroMotionOptions) {
  if (options.reducedMotion) return () => {}

  const { gsap, ScrollTrigger } = ensureGsap()

  const ctx = gsap.context(() => {
    const eyebrow = root.querySelector<HTMLElement>('[data-anim="hero-eyebrow"]')
    const title = root.querySelector<HTMLElement>('[data-anim="hero-title"]')
    const subtitle = root.querySelector<HTMLElement>('[data-anim="hero-subtitle"]')
    const cta = root.querySelector<HTMLElement>('[data-anim="hero-cta"]')
    const canvas = root.querySelector<HTMLElement>('[data-anim="hero-canvas"]')
    const bullets = root.querySelector<HTMLElement>('[data-anim="hero-bullets"]')
    const glowOrb = root.querySelector<HTMLElement>('[data-anim="hero-glow-orb"]')
    const floatingCards = gsap.utils.toArray<HTMLElement>('[data-anim="hero-float-card"]', root)
    const particles = gsap.utils.toArray<HTMLElement>('[data-anim="hero-particle"]', root)

    /* ─── Entrance stagger (page load) ─── */
    const stack = [eyebrow, title, subtitle, cta, bullets].filter(Boolean)
    gsap.fromTo(
      stack,
      { y: 32, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 1.1, ease: 'power3.out', stagger: 0.1 },
    )

    if (canvas) {
      gsap.fromTo(
        canvas,
        { y: 24, scale: 0.92, autoAlpha: 0 },
        { y: 0, scale: 1, autoAlpha: 1, duration: 1.4, ease: 'expo.out', delay: 0.15 },
      )
    }

    /* ─── Floating cards entrance ─── */
    if (floatingCards.length > 0) {
      gsap.fromTo(
        floatingCards,
        { y: 40, autoAlpha: 0, scale: 0.85 },
        {
          y: 0,
          autoAlpha: 1,
          scale: 1,
          duration: 1.2,
          ease: 'power3.out',
          stagger: 0.15,
          delay: 0.6,
        },
      )
    }

    /* ─── Glow orb entrance ─── */
    if (glowOrb) {
      gsap.fromTo(
        glowOrb,
        { scale: 0.4, autoAlpha: 0 },
        { scale: 1, autoAlpha: 1, duration: 2, ease: 'power2.out', delay: 0.3 },
      )
    }

    /* ─── Particles entrance ─── */
    if (particles.length > 0) {
      gsap.fromTo(
        particles,
        { autoAlpha: 0, scale: 0 },
        {
          autoAlpha: 1,
          scale: 1,
          duration: 1.5,
          ease: 'power2.out',
          stagger: { each: 0.08, from: 'random' },
          delay: 0.8,
        },
      )
    }

    /* ─── Scroll-driven parallax: hero text drifts up & fades as user scrolls ─── */
    const textCol = root.querySelector<HTMLElement>('[data-anim="hero-text-col"]')
    if (textCol) {
      gsap.to(textCol, {
        y: -80,
        autoAlpha: 0.15,
        ease: 'none',
        scrollTrigger: {
          trigger: root,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
        },
      })
    }

    /* ─── Scroll-driven parallax: 3D canvas drifts slower (depth effect) ─── */
    const canvasCol = root.querySelector<HTMLElement>('[data-anim="hero-canvas-col"]')
    if (canvasCol) {
      gsap.to(canvasCol, {
        y: -35,
        scale: 1.06,
        ease: 'none',
        scrollTrigger: {
          trigger: root,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
        },
      })
    }

    /* ─── Scroll-driven: glow orb expands & shifts ─── */
    if (glowOrb) {
      gsap.to(glowOrb, {
        scale: 1.5,
        y: -50,
        autoAlpha: 0.3,
        ease: 'none',
        scrollTrigger: {
          trigger: root,
          start: 'top top',
          end: 'bottom top',
          scrub: 2,
        },
      })
    }

    /* ─── Scroll-driven: floating cards drift at different speeds ─── */
    floatingCards.forEach((card, i) => {
      const speeds = [-60, -40, -70]
      gsap.to(card, {
        y: speeds[i % speeds.length],
        ease: 'none',
        scrollTrigger: {
          trigger: root,
          start: 'top top',
          end: 'bottom top',
          scrub: 1 + i * 0.3,
        },
      })
    })

    /* ─── Scroll-driven: particles drift at varying rates ─── */
    particles.forEach((p, i) => {
      gsap.to(p, {
        y: -(20 + (i % 5) * 15),
        autoAlpha: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: root,
          start: '20% top',
          end: 'bottom top',
          scrub: 1 + (i % 3) * 0.5,
        },
      })
    })

    /* ─── Continuous gentle float for floating cards (desktop) ─── */
    const mm = gsap.matchMedia()
    mm.add('(min-width: 768px)', () => {
      floatingCards.forEach((card, i) => {
        gsap.to(card, {
          y: `+=${6 + i * 3}`,
          duration: 2.5 + i * 0.5,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        })
      })

      /* Subtle rotation on particles */
      particles.forEach((p, i) => {
        gsap.to(p, {
          rotation: i % 2 === 0 ? 360 : -360,
          duration: 12 + i * 2,
          ease: 'none',
          repeat: -1,
        })
      })

      return () => { /* matchMedia cleanup */ }
    })

    /* ─── Scroll trigger to morph 3D artifact via CSS custom property ─── */
    if (canvas) {
      ScrollTrigger.create({
        trigger: root,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self) => {
          canvas.style.setProperty('--hero-scroll', String(self.progress))
        },
      })
    }
  }, root)

  return () => ctx.revert()
}
