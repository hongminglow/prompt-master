import { clsx } from 'clsx'
import { forwardRef } from 'react'
import type { ComponentPropsWithoutRef } from 'react'

type Props = ComponentPropsWithoutRef<'section'>

export const Section = forwardRef<HTMLElement, Props>(function Section(
  { className, ...props },
  ref,
) {
  return (
    <section
      ref={ref}
      className={clsx('relative py-20 md:py-28 scroll-mt-28', className)}
      {...props}
    />
  )
})
