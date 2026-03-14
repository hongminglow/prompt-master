import { clsx } from 'clsx'
import type { ComponentPropsWithoutRef } from 'react'

type Props = ComponentPropsWithoutRef<'div'>

export function Divider({ className, ...props }: Props) {
  return (
    <div
      className={clsx('h-px w-full bg-[color:var(--border)]', className)}
      {...props}
    />
  )
}

