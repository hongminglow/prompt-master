import { clsx } from 'clsx'
import type { ComponentPropsWithoutRef } from 'react'

type Props = ComponentPropsWithoutRef<'div'>

export function Card({ className, ...props }: Props) {
  return (
    <div
      className={clsx(
        'rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] shadow-[0_0_0_1px_rgba(255,255,255,0.05)]',
        className,
      )}
      {...props}
    />
  )
}

