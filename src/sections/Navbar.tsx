import { landing } from '../content/landing'
import { ButtonLink } from '../components/Button'
import { Container } from '../components/Container'
import { useLayoutEffect, useRef } from 'react'
import { ensureGsap } from '../motion/gsap'
import { useReducedMotion } from '../motion/useReducedMotion'

export function Navbar() {
  const reducedMotion = useReducedMotion()
  const pillRef = useRef<HTMLDivElement | null>(null)

  useLayoutEffect(() => {
    const el = pillRef.current
    if (!el || reducedMotion) return

    const { gsap, ScrollTrigger } = ensureGsap()

    const setScale = gsap.quickTo(el, 'scale', { duration: 0.25, ease: 'power2.out' })
    const setY = gsap.quickTo(el, 'y', { duration: 0.25, ease: 'power2.out' })
    const setBg = gsap.quickTo(el, 'backgroundColor', {
      duration: 0.25,
      ease: 'power2.out',
    }) as unknown as (value: string) => void
    const setBorder = gsap.quickTo(el, 'borderColor', {
      duration: 0.25,
      ease: 'power2.out',
    }) as unknown as (value: string) => void
    const setShadow = gsap.quickTo(el, 'boxShadow', {
      duration: 0.3,
      ease: 'power2.out',
    }) as unknown as (value: string) => void

    const expanded = {
      backgroundColor: 'rgba(255,255,255,0.06)',
      borderColor: 'rgba(255,255,255,0.10)',
      boxShadow: '0 0 0 1px rgba(255,255,255,0.05)',
    }

    const compact = {
      backgroundColor: 'rgba(255,255,255,0.10)',
      borderColor: 'rgba(255,255,255,0.14)',
      boxShadow: '0 18px 50px rgba(0,0,0,0.35)',
    }

    const st = ScrollTrigger.create({
      start: 0,
      end: 99999,
      onUpdate: (self) => {
        const y = self.scroll()
        const scrolled = y > 18

        if (!scrolled) {
          setScale(1)
          setY(0)
          setBg(expanded.backgroundColor)
          setBorder(expanded.borderColor)
          setShadow(expanded.boxShadow)
          return
        }

        setBg(compact.backgroundColor)
        setBorder(compact.borderColor)
        setShadow(compact.boxShadow)

        if (self.direction === 1 && y > 120) {
          setScale(0.985)
          setY(-6)
          return
        }

        setScale(1)
        setY(0)
      },
    })

    return () => {
      st.kill()
      gsap.killTweensOf(el)
    }
  }, [reducedMotion])

  return (
    <header className="fixed inset-x-0 top-3 z-50">
      <Container>
        <div
          ref={pillRef}
          data-nav
          className="flex items-center justify-between rounded-full border border-[color:var(--border)] bg-[color:var(--surface)] px-3 py-2 backdrop-blur-md"
        >
          <a
            href="#top"
            className="group inline-flex items-center gap-2 rounded-full px-2 py-2 text-[13px] font-medium text-[color:var(--text)]"
            aria-label={`${landing.brand.name} home`}
          >
            <span className="relative grid size-7 place-items-center rounded-full bg-gradient-to-r from-[var(--brand-a)] via-[var(--brand-c)] to-[var(--brand-b)] text-[#05060a] shadow-[0_10px_25px_rgba(124,92,255,0.18)]">
              O
            </span>
            <span className="hidden sm:block tracking-[0.14em]">
              {landing.brand.name}
            </span>
          </a>

          <nav aria-label="Primary" className="hidden md:flex items-center gap-6">
            {landing.nav.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[13px] font-medium text-[color:var(--muted)] transition-colors hover:text-[color:var(--text)]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ButtonLink
              href={landing.nav.cta.href}
              variant="primary"
              className="px-4 py-2.5 text-[13px]"
            >
              {landing.nav.cta.label}
            </ButtonLink>
          </div>
        </div>
      </Container>
    </header>
  )
}
