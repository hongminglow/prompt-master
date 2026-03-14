import { Card } from '../components/Card'
import { Container } from '../components/Container'
import { H2, H3 } from '../components/Heading'
import { Section } from '../components/Section'
import { landing } from '../content/landing'

export function Testimonials() {
  return (
    <Section>
      <Container>
        <div className="flex flex-col gap-10">
          <div>
            <H2 className="font-medium">{landing.testimonials.title}</H2>
            <p className="mt-3 max-w-[62ch] text-[16px] leading-[1.6] text-[color:var(--muted)] md:text-[18px]">
              Motion is a feeling — but shipping it is an engineering discipline.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {landing.testimonials.items.map((t) => (
              <Card key={t.name} className="p-6 md:p-7">
                <p className="text-[16px] leading-[1.6] text-[color:var(--text)]">
                  “{t.quote}”
                </p>
                <div className="mt-6">
                  <H3 className="text-[16px] font-medium">{t.name}</H3>
                  <p className="mt-1 text-[13px] text-[color:var(--muted-2)]">
                    {t.role}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  )
}

