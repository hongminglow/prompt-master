import { clsx } from 'clsx'
import type { ComponentPropsWithoutRef } from 'react'

type Props = ComponentPropsWithoutRef<'div'>

export function Container({ className, ...props }: Props) {
  return (
    <div
      className={clsx(
        'mx-auto w-full max-w-[1200px] px-5 sm:px-7 lg:px-8',
        className,
      )}
      {...props}
    />
  )
}

