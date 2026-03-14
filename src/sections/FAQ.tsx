import { ChevronDown } from 'lucide-react'
import { useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Card } from '../components/Card'
import { Container } from '../components/Container'
import { H2 } from '../components/Heading'
import { Section } from '../components/Section'
import { landing } from '../content/landing'
import { ensureGsap } from '../motion/gsap'
import { useReducedMotion } from '../motion/useReducedMotion'

type FAQRowProps = {
  question: string
  answer: string
  isOpen: boolean
  reducedMotion: boolean
  onToggle: () => void
}

function FAQRow({ question, answer, isOpen, reducedMotion, onToggle }: FAQRowProps) {
  const contentRef = useRef<HTMLDivElement | null>(null)
  const isInitial = useRef(true)

  useLayoutEffect(() => {
    const el = contentRef.current
    if (!el) return

    if (reducedMotion) {
      el.style.height = isOpen ? 'auto' : '0px'
      el.style.opacity = isOpen ? '1' : '0'
      return
    }

    const { gsap } = ensureGsap()
    gsap.killTweensOf(el)

    if (isInitial.current) {
      gsap.set(el, { height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 })
      isInitial.current = false
      return
    }

    if (isOpen) {
      gsap.fromTo(
        el,
        { height: 0, opacity: 0 },
        { height: 'auto', opacity: 1, duration: 0.25, ease: 'power2.out' },
      )
      return
    }

    const currentHeight = el.getBoundingClientRect().height
    gsap.fromTo(
      el,
      { height: currentHeight, opacity: 1 },
      { height: 0, opacity: 0, duration: 0.2, ease: 'power2.out' },
    )
  }, [isOpen, reducedMotion])

  return (
    <Card className="p-0">
      <button
        type="button"
        className="flex w-full items-center justify-between gap-4 rounded-2xl px-6 py-5 text-left"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className="text-[15px] font-medium md:text-[16px]">{question}</span>
        <ChevronDown
          className={[
            'size-5 shrink-0 text-[color:var(--muted)] transition-transform',
            isOpen ? 'rotate-180' : 'rotate-0',
          ].join(' ')}
          aria-hidden="true"
        />
      </button>
      <div
        ref={contentRef}
        className="overflow-hidden px-6"
        style={reducedMotion ? { height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 } : undefined}
      >
        <div className="pb-6">
          <p className="text-[15px] leading-[1.6] text-[color:var(--muted)]">
            {answer}
          </p>
        </div>
      </div>
    </Card>
  )
}

export function FAQ() {
  const reducedMotion = useReducedMotion()
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const items = useMemo(() => landing.faq.items, [])

  return (
    <Section id="faq">
      <Container>
        <div className="flex flex-col gap-10">
          <div>
            <H2 className="font-medium">{landing.faq.title}</H2>
            <p className="mt-3 max-w-[62ch] text-[16px] leading-[1.6] text-[color:var(--muted)] md:text-[18px]">
              Clear answers. No hidden gotchas.
            </p>
          </div>

          <div className="grid gap-3">
            {items.map((item, idx) => {
              const isOpen = openIndex === idx
              return (
                <FAQRow
                  key={item.question}
                  question={item.question}
                  answer={item.answer}
                  isOpen={isOpen}
                  reducedMotion={reducedMotion}
                  onToggle={() => setOpenIndex(isOpen ? null : idx)}
                />
              )
            })}
          </div>
        </div>
      </Container>
    </Section>
  )
}
