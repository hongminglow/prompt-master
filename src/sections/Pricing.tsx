import { Check } from 'lucide-react'
import { Card } from '../components/Card'
import { ButtonLink } from '../components/Button'
import { Container } from '../components/Container'
import { H2, H3 } from '../components/Heading'
import { Section } from '../components/Section'
import { landing } from '../content/landing'

export function Pricing() {
  return (
    <Section id="pricing">
      <Container>
        <div className="flex flex-col gap-10">
          <div>
            <H2 className="font-medium">{landing.pricing.title}</H2>
            <p className="mt-3 max-w-[62ch] text-[16px] leading-[1.6] text-[color:var(--muted)] md:text-[18px]">
              Start small, then dial up the cinematic polish when you’re ready.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {landing.pricing.tiers.map((tier) => (
              <Card
                key={tier.name}
                className={[
                  'relative p-6 md:p-7',
                  tier.highlight
                    ? 'bg-[color:var(--surface-strong)] ring-1 ring-white/10'
                    : '',
                ].join(' ')}
              >
                {tier.highlight ? (
                  <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-r from-[var(--brand-a)]/20 via-[var(--brand-c)]/15 to-[var(--brand-b)]/20" />
                ) : null}

                <div className="relative">
                  <H3 className="font-medium">{tier.name}</H3>
                  <div className="mt-3 text-[40px] leading-none tracking-[-0.03em]">
                    {tier.price}
                  </div>
                  <p className="mt-3 text-[13px] text-[color:var(--muted-2)]">
                    For: {tier.for}
                  </p>

                  <ul className="mt-6 grid gap-3 text-[14px] text-[color:var(--muted)]">
                    {tier.includes.map((inc) => (
                      <li key={inc} className="flex items-start gap-3">
                        <span className="mt-[2px] grid size-5 place-items-center rounded-full border border-[color:var(--border)] bg-[color:var(--surface)]">
                          <Check className="size-3.5" aria-hidden="true" />
                        </span>
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8">
                    <ButtonLink
                      href={tier.href}
                      variant={tier.highlight ? 'primary' : 'secondary'}
                      size="lg"
                      className="w-full"
                    >
                      {tier.cta}
                    </ButtonLink>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  )
}

