import {
  Accessibility,
  Gauge,
  Gem,
  ScrollText,
  Smartphone,
  Waves,
} from 'lucide-react'
import { useLayoutEffect, useRef } from 'react'
import { Card } from '../components/Card'
import { Container } from '../components/Container'
import { H2, H3 } from '../components/Heading'
import { Section } from '../components/Section'
import { landing } from '../content/landing'
import { attachFeaturesMotion } from '../motion/sections/featuresMotion'
import { useReducedMotion } from '../motion/useReducedMotion'

const icons = [ScrollText, Gem, Waves, Smartphone, Accessibility, Gauge] as const

export function Features() {
  const reducedMotion = useReducedMotion()
  const rootRef = useRef<HTMLElement | null>(null)

  useLayoutEffect(() => {
    if (!rootRef.current) return
    return attachFeaturesMotion(rootRef.current, { reducedMotion })
  }, [reducedMotion])

  return (
    <Section id="features" data-features ref={rootRef}>
      <Container>
        <div className="flex flex-col gap-10">
          <div>
            <H2 className="font-medium">{landing.features.title}</H2>
            <p className="mt-3 max-w-[62ch] text-[16px] leading-[1.6] text-[color:var(--muted)] md:text-[18px]">
              {landing.features.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {landing.features.items.map((feature, index) => {
              const Icon = icons[index] ?? Waves
              return (
                <Card
                  key={feature.title}
                  data-anim="feature-card"
                  className="group p-6 transition-colors hover:bg-[color:var(--surface-strong)] md:p-7"
                >
                  <div className="flex items-center gap-3">
                    <span className="grid size-10 place-items-center rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)]">
                      <Icon className="size-5 text-[color:var(--text)]" aria-hidden="true" />
                    </span>
                    <H3 className="font-medium">{feature.title}</H3>
                  </div>
                  <p className="mt-4 text-[15px] leading-[1.6] text-[color:var(--muted)]">
                    {feature.description}
                  </p>
                </Card>
              )
            })}
          </div>
        </div>
      </Container>
    </Section>
  )
}
