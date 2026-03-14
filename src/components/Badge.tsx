import { clsx } from 'clsx'
import type { ComponentPropsWithoutRef } from 'react'

type Props = ComponentPropsWithoutRef<'span'>

export function Badge({ className, ...props }: Props) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full border border-[color:var(--border)] bg-[color:var(--surface)] px-3 py-1 text-[12px] leading-none text-[color:var(--muted)]',
        className,
      )}
      {...props}
    />
  )
}

