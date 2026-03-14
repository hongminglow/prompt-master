import { Check, ArrowRight } from 'lucide-react'
import { useLayoutEffect, useRef } from 'react'
import { Badge } from '../components/Badge'
import { ButtonLink } from '../components/Button'
import { Container } from '../components/Container'
import { H1 } from '../components/Heading'
import { Section } from '../components/Section'
import { landing } from '../content/landing'
import { attachHeroMotion } from '../motion/sections/heroMotion'
import { useReducedMotion } from '../motion/useReducedMotion'
import { SceneCanvas } from '../three/SceneCanvas'

export function Hero() {
  const reducedMotion = useReducedMotion()
  const rootRef = useRef<HTMLElement | null>(null)

  useLayoutEffect(() => {
    if (!rootRef.current) return
    return attachHeroMotion(rootRef.current, { reducedMotion })
  }, [reducedMotion])

  return (
    <Section
      id="top"
      data-hero
      ref={rootRef}
      className="pt-32 md:pt-40 pb-16 md:pb-24"
    >
      <Container>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:items-center">
          <div className="max-w-[62ch]">
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

            <ul className="mt-10 grid gap-3 text-[14px] text-[color:var(--muted)] md:text-[15px]">
              {landing.hero.bullets.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-[2px] grid size-5 place-items-center rounded-full border border-[color:var(--border)] bg-[color:var(--surface)]">
                    <Check className="size-3.5" aria-hidden="true" />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative">
            <div className="absolute -inset-8 -z-10 rounded-[32px] bg-gradient-to-r from-[var(--brand-a)]/15 via-[var(--brand-c)]/10 to-[var(--brand-b)]/15 blur-2xl" />
            <div className="aspect-[4/3] w-full overflow-hidden rounded-[32px] border border-[color:var(--border)] bg-[color:var(--surface)] shadow-[0_0_0_1px_rgba(255,255,255,0.05)]">
              <SceneCanvas
                className="h-full w-full"
                variant="hero"
                data-anim="hero-canvas"
              />
            </div>
            <p className="mt-3 text-[13px] text-[color:var(--muted-2)]">
              {landing.brand.tagline}
            </p>
          </div>
        </div>
      </Container>
    </Section>
  )
}
