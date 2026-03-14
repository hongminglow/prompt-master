import { useLayoutEffect, useMemo, useRef } from 'react'
import { Card } from '../components/Card'
import { Container } from '../components/Container'
import { H2, H3 } from '../components/Heading'
import { Section } from '../components/Section'
import { landing } from '../content/landing'
import { attachChaptersMotion } from '../motion/sections/chaptersMotion'
import { useIsTouchDevice } from '../motion/useIsTouchDevice'
import { useReducedMotion } from '../motion/useReducedMotion'
import type { OrbitArtifactControls } from '../three/SceneCanvas'
import { SceneCanvas } from '../three/SceneCanvas'

export function ScrollChapters() {
  const reducedMotion = useReducedMotion()
  const isTouch = useIsTouchDevice()
  const rootRef = useRef<HTMLElement | null>(null)
  const usePinned = !reducedMotion && !isTouch

  const controls = useMemo<OrbitArtifactControls>(
    () => ({ spin: 0.2, glow: 0.22, deform: 0.28, progress: 0 }),
    [],
  )

  useLayoutEffect(() => {
    if (!rootRef.current) return
    return attachChaptersMotion(rootRef.current, { isTouch, reducedMotion, controls })
  }, [controls, isTouch, reducedMotion])

  return (
    <Section id="chapters" ref={rootRef} data-chapters>
      <Container>
        <div className="flex flex-col gap-10">
          <div>
            <H2 className="font-medium">{landing.chapters.title}</H2>
            <p className="mt-3 max-w-[62ch] text-[16px] leading-[1.6] text-[color:var(--muted)] md:text-[18px]">
              {landing.chapters.subtitle}
            </p>
          </div>

          {usePinned ? (
            <>
              {/* Mobile: stacked, unpinned */}
              <div className="md:hidden">
                <div className="mb-6 overflow-hidden rounded-[28px] border border-[color:var(--border)] bg-[color:var(--surface)]">
                  <SceneCanvas className="h-[260px] w-full" variant="chapters" controls={controls} />
                </div>
                <div className="grid gap-4">
                  {landing.chapters.chapters.map((c) => (
                    <Card key={c.title} className="p-6">
                      <H3 className="font-medium">{c.title}</H3>
                      <p className="mt-3 text-[15px] leading-[1.6] text-[color:var(--muted)]">
                        {c.body}
                      </p>
                      <ul className="mt-4 grid gap-2 text-[13px] text-[color:var(--muted-2)]">
                        {c.bullets.map((b) => (
                          <li key={b}>• {b}</li>
                        ))}
                      </ul>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Desktop: pinned stage (motion wired by GSAP) */}
              <div className="hidden md:block" data-chapters-stage>
                <div className="grid grid-cols-[1fr,1.1fr] gap-10">
                  <div className="relative">
                    <div
                      className="absolute -left-3 top-0 bottom-0 w-px bg-[color:var(--border)]"
                      aria-hidden="true"
                    />

                    <div className="flex items-start gap-6">
                      <div className="relative mt-2 w-4">
                        <div
                          className="absolute left-[6px] top-0 h-[140px] w-[2px] rounded-full bg-white/10"
                          aria-hidden="true"
                        />
                        <div
                          data-chapters-progress
                          className="absolute left-[6px] top-0 h-[140px] w-[2px] origin-top rounded-full bg-gradient-to-b from-[var(--brand-a)] via-[var(--brand-c)] to-[var(--brand-b)]"
                          style={{
                            transform: `scaleY(${1 / landing.chapters.chapters.length})`,
                          }}
                          aria-hidden="true"
                        />
                      </div>

                      <div className="relative min-h-[360px] flex-1">
                        {landing.chapters.chapters.map((c, idx) => (
                          <div
                            key={c.title}
                            data-chapter-panel={idx}
                            className={idx === 0 ? 'relative' : 'absolute inset-0 opacity-0'}
                          >
                            <p className="text-[13px] font-medium tracking-[0.18em] text-[color:var(--muted-2)]">
                              0{idx + 1}
                            </p>
                            <H3 className="mt-3 font-medium">{c.title}</H3>
                            <p className="mt-4 text-[16px] leading-[1.6] text-[color:var(--muted)]">
                              {c.body}
                            </p>
                            <ul className="mt-6 grid gap-2 text-[14px] text-[color:var(--muted-2)]">
                              {c.bullets.map((b) => (
                                <li key={b}>• {b}</li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="absolute -inset-10 -z-10 rounded-[36px] bg-gradient-to-r from-[var(--brand-a)]/14 via-[var(--brand-c)]/10 to-[var(--brand-b)]/14 blur-2xl" />
                    <div className="aspect-[4/3] w-full overflow-hidden rounded-[36px] border border-[color:var(--border)] bg-[color:var(--surface)] shadow-[0_0_0_1px_rgba(255,255,255,0.05)]">
                      <SceneCanvas className="h-full w-full" variant="chapters" controls={controls} />
                    </div>
                    <div className="mt-3 flex items-center gap-2 text-[13px] text-[color:var(--muted-2)]">
                      <span
                        className="inline-flex size-1.5 rounded-full bg-[var(--brand-b)]"
                        aria-hidden="true"
                      />
                      <span>Scroll to progress chapters</span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div>
              <div className="mb-6 overflow-hidden rounded-[28px] border border-[color:var(--border)] bg-[color:var(--surface)]">
                <SceneCanvas className="h-[260px] w-full md:h-[340px]" variant="chapters" controls={controls} />
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                {landing.chapters.chapters.map((c) => (
                  <Card key={c.title} className="p-6">
                    <H3 className="font-medium">{c.title}</H3>
                    <p className="mt-3 text-[15px] leading-[1.6] text-[color:var(--muted)]">
                      {c.body}
                    </p>
                    <ul className="mt-4 grid gap-2 text-[13px] text-[color:var(--muted-2)]">
                      {c.bullets.map((b) => (
                        <li key={b}>• {b}</li>
                      ))}
                    </ul>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </Container>
    </Section>
  )
}
