import { Card } from '../components/Card'
import { Container } from '../components/Container'
import { H2, H3 } from '../components/Heading'
import { Section } from '../components/Section'
import { landing } from '../content/landing'

export function HowItWorks() {
  return (
    <Section>
      <Container>
        <div className="flex flex-col gap-10">
          <div>
            <H2 className="font-medium">{landing.howItWorks.title}</H2>
            <p className="mt-3 max-w-[62ch] text-[16px] leading-[1.6] text-[color:var(--muted)] md:text-[18px]">
              A simple, repeatable sequence that keeps motion polished — and keeps the codebase sane.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {landing.howItWorks.steps.map((step, index) => (
              <Card key={step.title} className="p-6 md:p-7">
                <p className="text-[13px] font-medium tracking-[0.18em] text-[color:var(--muted-2)]">
                  STEP 0{index + 1}
                </p>
                <H3 className="mt-3 font-medium">{step.title}</H3>
                <p className="mt-3 text-[15px] leading-[1.6] text-[color:var(--muted)]">
                  {step.body}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  )
}

