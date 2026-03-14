import { Mail } from 'lucide-react'
import { ButtonLink } from '../components/Button'
import { Card } from '../components/Card'
import { Container } from '../components/Container'
import { H2 } from '../components/Heading'
import { Section } from '../components/Section'
import { landing } from '../content/landing'

export function FinalCTA() {
  return (
    <Section id={landing.finalCta.id}>
      <Container>
        <Card className="relative overflow-hidden p-8 md:p-12">
          <div className="pointer-events-none absolute -inset-20 rounded-[48px] bg-gradient-to-r from-[var(--brand-a)]/20 via-[var(--brand-c)]/14 to-[var(--brand-b)]/18 blur-2xl" />
          <div className="relative">
            <H2 className="font-medium">{landing.finalCta.title}</H2>
            <p className="mt-4 max-w-[62ch] text-[16px] leading-[1.6] text-[color:var(--muted)] md:text-[18px]">
              {landing.finalCta.body}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <ButtonLink href={landing.finalCta.primaryCta.href} variant="primary" size="lg">
                {landing.finalCta.primaryCta.label}
              </ButtonLink>
              <ButtonLink
                href={landing.finalCta.secondaryCta.href}
                variant="secondary"
                size="lg"
              >
                <Mail className="size-4" aria-hidden="true" />
                {landing.finalCta.secondaryCta.label}
              </ButtonLink>
            </div>

            <p className="mt-4 text-[13px] text-[color:var(--muted-2)]">
              {landing.finalCta.note}
            </p>
          </div>
        </Card>
      </Container>
    </Section>
  )
}

