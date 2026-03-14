import { clsx } from 'clsx'

type Props = {
  logos: readonly string[]
  className?: string
}

export function LogoCloud({ logos, className }: Props) {
  return (
    <ul
      className={clsx(
        'grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6',
        className,
      )}
    >
      {logos.map((name) => (
        <li
          key={name}
          className="flex items-center justify-center rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] px-3 py-4 text-[13px] font-medium tracking-[0.08em] text-[color:var(--muted)]"
          aria-label={name}
          title={name}
        >
          {name}
        </li>
      ))}
    </ul>
  )
}
