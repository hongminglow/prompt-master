import { Card } from '../components/Card'
import { Container } from '../components/Container'
import { H2, H3 } from '../components/Heading'
import { LogoCloud } from '../components/LogoCloud'
import { Section } from '../components/Section'
import { landing } from '../content/landing'

export function SocialProof() {
  return (
    <Section>
      <Container>
        <div className="flex flex-col gap-10">
          <div>
            <H2 className="font-medium">{landing.socialProof.title}</H2>
            <p className="mt-3 max-w-[62ch] text-[16px] leading-[1.6] text-[color:var(--muted)] md:text-[18px]">
              Real teams. Real constraints. A landing page system that stays maintainable.
            </p>
          </div>

          <LogoCloud logos={landing.socialProof.logos} />

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {landing.socialProof.metrics.map((m) => (
              <Card key={m.label} className="p-6 md:p-7">
                <div className="text-[40px] leading-none tracking-[-0.03em] md:text-[44px]">
                  {m.value}
                </div>
                <H3 className="mt-3 text-[16px] md:text-[18px]">{m.label}</H3>
                <p className="mt-2 text-[13px] text-[color:var(--muted-2)]">
                  Measured across recent launches using chaptered scroll narratives.
                </p>
              </Card>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  )
}

