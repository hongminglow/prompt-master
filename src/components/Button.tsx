import { clsx } from 'clsx'
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react'

type Variant = 'primary' | 'secondary'
type Size = 'md' | 'lg'

function getButtonClasses(variant: Variant, size: Size) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-full font-medium transition will-change-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--bg)] disabled:opacity-50 disabled:pointer-events-none'

  const sizes: Record<Size, string> = {
    md: 'px-5 py-3 text-[14px] leading-none',
    lg: 'px-6 py-3.5 text-[14px] leading-none',
  }

  const variants: Record<Variant, string> = {
    primary:
      'text-[#05060a] bg-gradient-to-r from-[var(--brand-a)] via-[var(--brand-c)] to-[var(--brand-b)] shadow-[0_10px_30px_rgba(124,92,255,0.18)] hover:brightness-110 hover:shadow-[0_14px_34px_rgba(124,92,255,0.26)] active:translate-y-[1px]',
    secondary:
      'text-[color:var(--text)] bg-[color:var(--surface)] border border-[color:var(--border)] hover:bg-[color:var(--surface-strong)] active:translate-y-[1px]',
  }

  return clsx(base, sizes[size], variants[variant])
}

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant
  size?: Size
}

export function Button({
  className,
  variant = 'primary',
  size = 'md',
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(getButtonClasses(variant, size), className)}
      {...props}
    />
  )
}

export type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: Variant
  size?: Size
}

export function ButtonLink({
  className,
  variant = 'primary',
  size = 'md',
  ...props
}: ButtonLinkProps) {
  return (
    <a className={clsx(getButtonClasses(variant, size), className)} {...props} />
  )
}

