import { Check, ArrowRight, Code2, Layers, Sparkles } from 'lucide-react'
import { useCallback, useLayoutEffect, useRef, useState } from 'react'
import { Badge } from '../components/Badge'
import { ButtonLink } from '../components/Button'
import { Container } from '../components/Container'
import { H1 } from '../components/Heading'
import { Section } from '../components/Section'
import { landing } from '../content/landing'
import { attachHeroMotion } from '../motion/sections/heroMotion'
import { useReducedMotion } from '../motion/useReducedMotion'
import { SceneCanvas } from '../three/SceneCanvas'

/* ─── Floating particle dots ─── */
const PARTICLES = Array.from({ length: 18 }, (_, i) => {
  const size = 2 + Math.random() * 4
  const x = Math.random() * 100
  const y = Math.random() * 100
  const opacity = 0.15 + Math.random() * 0.35
  return { id: i, size, x, y, opacity }
})

/* ─── Floating tech mini-cards ─── */
const FLOAT_CARDS = [
  { icon: Code2, label: 'Three.js', x: '8%', y: '18%', delay: 0 },
  { icon: Layers, label: 'GSAP', x: '82%', y: '72%', delay: 1 },
  { icon: Sparkles, label: 'React 19', x: '72%', y: '12%', delay: 2 },
]

export function Hero() {
  const reducedMotion = useReducedMotion()
  const rootRef = useRef<HTMLElement | null>(null)
  const [heroScroll, setHeroScroll] = useState(0)

  /* Read `--hero-scroll` CSS custom property set by heroMotion ScrollTrigger */
  const canvasRef = useRef<HTMLDivElement | null>(null)

  const rafRef = useRef<number>(0)
  const readScrollProgress = useCallback(() => {
    const el = canvasRef.current
    if (el) {
      const raw = el.style.getPropertyValue('--hero-scroll')
      const val = parseFloat(raw)
      if (!isNaN(val)) setHeroScroll(val)
    }
    rafRef.current = requestAnimationFrame(readScrollProgress)
  }, [])

  useLayoutEffect(() => {
    rafRef.current = requestAnimationFrame(readScrollProgress)
    return () => cancelAnimationFrame(rafRef.current)
  }, [readScrollProgress])

  useLayoutEffect(() => {
    if (!rootRef.current) return
    return attachHeroMotion(rootRef.current, { reducedMotion })
  }, [reducedMotion])

  return (
    <Section
      id="top"
      data-hero
      ref={rootRef}
      className="relative overflow-hidden pt-32 md:pt-40 pb-16 md:pb-24"
    >
      {/* ─── Background glow orb ─── */}
      <div
        data-anim="hero-glow-orb"
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full md:h-[900px] md:w-[900px]"
        style={{
          background:
            'radial-gradient(circle, rgba(124,92,255,0.18) 0%, rgba(86,168,255,0.12) 35%, rgba(46,233,166,0.06) 60%, transparent 80%)',
          filter: 'blur(80px)',
        }}
      />

      {/* ─── Floating particles ─── */}
      {PARTICLES.map((p) => (
        <div
          key={p.id}
          data-anim="hero-particle"
          className="pointer-events-none absolute -z-10 rounded-full"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
            opacity: p.opacity,
            background:
              p.id % 3 === 0
                ? 'var(--brand-a)'
                : p.id % 3 === 1
                  ? 'var(--brand-b)'
                  : 'var(--brand-c)',
            boxShadow: `0 0 ${p.size * 3}px currentColor`,
          }}
        />
      ))}

      <Container className="relative">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:items-center">
          {/* ─── Text column ─── */}
          <div className="max-w-[62ch]" data-anim="hero-text-col">
            <Badge data-anim="hero-eyebrow">{landing.hero.eyebrow}</Badge>

            <H1 className="mt-6 font-medium" data-anim="hero-title">
              {landing.hero.title}
            </H1>

            <p
              className="mt-5 text-[16px] leading-[1.6] text-[color:var(--muted)] md:text-[18px]"
              data-anim="hero-subtitle"
            >
              {landing.hero.subtitle}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3" data-anim="hero-cta">
              <ButtonLink href={landing.hero.primaryCta.href} variant="primary" size="lg">
                {landing.hero.primaryCta.label}
                <ArrowRight className="size-4" aria-hidden="true" />
              </ButtonLink>
              <ButtonLink
                href={landing.hero.secondaryCta.href}
                variant="secondary"
                size="lg"
              >
                {landing.hero.secondaryCta.label}
              </ButtonLink>
            </div>

            <ul
              className="mt-10 grid gap-3 text-[14px] text-[color:var(--muted)] md:text-[15px]"
              data-anim="hero-bullets"
            >
              {landing.hero.bullets.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-[2px] grid size-5 shrink-0 place-items-center rounded-full border border-[color:var(--border)] bg-[color:var(--surface)]">
                    <Check className="size-3.5" aria-hidden="true" />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* ─── 3D canvas column ─── */}
          <div className="relative" data-anim="hero-canvas-col">
            {/* Gradient backdrop */}
            <div className="absolute -inset-8 -z-10 rounded-[32px] bg-gradient-to-r from-[var(--brand-a)]/15 via-[var(--brand-c)]/10 to-[var(--brand-b)]/15 blur-2xl" />

            {/* 3D Scene */}
            <div
              ref={canvasRef}
              className="aspect-[4/3] w-full overflow-hidden rounded-[32px] border border-[color:var(--border)] bg-[color:var(--surface)] shadow-[0_0_0_1px_rgba(255,255,255,0.05)]"
            >
              <SceneCanvas
                className="h-full w-full"
                variant="hero"
                data-anim="hero-canvas"
                heroScrollProgress={heroScroll}
              />
            </div>

            <p className="mt-3 text-[13px] text-[color:var(--muted-2)]">
              {landing.brand.tagline}
            </p>

            {/* ─── Floating tech cards ─── */}
            {FLOAT_CARDS.map((card) => {
              const Icon = card.icon
              return (
                <div
                  key={card.label}
                  data-anim="hero-float-card"
                  className="pointer-events-none absolute hidden md:flex items-center gap-2 rounded-xl border border-[color:var(--border)] bg-[color:var(--surface)] px-3 py-2 text-[12px] font-medium text-[color:var(--muted)] shadow-lg backdrop-blur-sm"
                  style={{ left: card.x, top: card.y }}
                >
                  <Icon className="size-3.5 text-[color:var(--brand-a)]" aria-hidden="true" />
                  {card.label}
                </div>
              )
            })}
          </div>
        </div>
      </Container>
    </Section>
  )
}
