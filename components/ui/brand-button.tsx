import Link from 'next/link'
import { IconArrowRight, IconArrowUpRight } from '@tabler/icons-react'
import type { MouseEventHandler, ReactNode } from 'react'

export type ButtonVariant = 'primary' | 'dark' | 'secondary' | 'outline-light' | 'light'

const variants: Record<ButtonVariant, string> = {
  primary: 'border-transparent bg-teal text-white hover:bg-slate',
  dark: 'border-transparent bg-slate text-white hover:bg-teal',
  secondary: 'border-ink/30 text-ink hover:border-ink hover:bg-ink hover:text-white',
  'outline-light': 'border-white/40 text-white hover:border-white hover:bg-white hover:text-deep',
  light: 'border-transparent bg-paper text-slate hover:bg-teal hover:text-white',
}

type Props = {
  children: ReactNode
  href?: string
  variant?: ButtonVariant
  icon?: 'arrow' | 'up-right' | 'none'
  className?: string
  type?: 'button' | 'submit'
  onClick?: MouseEventHandler<HTMLElement>
}

/**
 * The one button for the whole site: 12px radius, consistent height and type,
 * a subtle lift on hover, and an arrow that slides 6px. Internal hrefs use
 * next/link; http(s), tel: and mailto: hrefs render a plain anchor.
 */
export function BrandButton({
  children,
  href,
  variant = 'primary',
  icon = 'arrow',
  className = '',
  type = 'button',
  onClick,
}: Props) {
  const cls = `group inline-flex min-h-12 items-center justify-center gap-3 rounded-xl border px-5 text-center text-[12px] sm:px-6 font-bold uppercase tracking-[0.12em] transition-[background-color,color,border-color,transform] duration-300 hover:-translate-y-0.5 active:translate-y-0 ${variants[variant]} ${className}`
  const Icon = icon === 'up-right' ? IconArrowUpRight : IconArrowRight
  const iconMove = icon === 'up-right' ? 'group-hover:translate-x-1 group-hover:-translate-y-1' : 'group-hover:translate-x-1.5'
  const inner = (
    <>
      <span>{children}</span>
      {icon !== 'none' && <Icon size={16} aria-hidden className={`shrink-0 transition-transform duration-300 ${iconMove}`} />}
    </>
  )

  if (!href) {
    return (
      <button type={type} onClick={onClick} className={cls}>
        {inner}
      </button>
    )
  }
  if (/^(https?:|tel:|mailto:)/.test(href)) {
    const web = href.startsWith('http')
    return (
      <a href={href} className={cls} {...(web ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
        {inner}
      </a>
    )
  }
  return (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  )
}
