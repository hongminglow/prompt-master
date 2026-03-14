import { clsx } from 'clsx'
import type { ComponentPropsWithoutRef } from 'react'

type Props = ComponentPropsWithoutRef<'h1'>

export function H1({ className, ...props }: Props) {
  return (
    <h1
      className={clsx(
        'text-[44px] leading-[1.02] tracking-[-0.04em] md:text-[72px]',
        className,
      )}
      {...props}
    />
  )
}

export function H2({ className, ...props }: ComponentPropsWithoutRef<'h2'>) {
  return (
    <h2
      className={clsx(
        'text-[32px] leading-[1.08] tracking-[-0.03em] md:text-[48px]',
        className,
      )}
      {...props}
    />
  )
}

export function H3({ className, ...props }: ComponentPropsWithoutRef<'h3'>) {
  return (
    <h3
      className={clsx(
        'text-[22px] leading-[1.15] tracking-[-0.02em] md:text-[28px]',
        className,
      )}
      {...props}
    />
  )
}

