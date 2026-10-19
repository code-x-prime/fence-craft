'use client'

import { IconDownload } from '@tabler/icons-react'
import { useBrochure } from '@/components/brochure/brochure-provider'

const tones = {
  // for the transparent (dark) header and the footer
  'on-dark': 'border-white/40 text-white hover:border-white hover:bg-white hover:text-deep',
  // for the solid light header
  'on-light': 'border-ink/30 text-ink hover:border-ink hover:bg-ink hover:text-white',
} as const

/** Opens the brochure dialog. `iconOnly` hides the label (kept for screen readers). */
export function BrochureButton({
  tone = 'on-dark',
  iconOnly = false,
  className = '',
}: {
  tone?: keyof typeof tones
  iconOnly?: boolean
  className?: string
}) {
  const { open } = useBrochure()
  return (
    <button
      type="button"
      onClick={open}
      aria-haspopup="dialog"
      aria-label={iconOnly ? 'Download brochure' : undefined}
      className={`group inline-flex min-h-11 items-center justify-center gap-2.5 rounded-xl border px-4 text-[12px] font-bold uppercase tracking-[0.12em] transition-[background-color,color,border-color,transform] duration-300 hover:-translate-y-0.5 active:translate-y-0 ${tones[tone]} ${className}`}
    >
      <IconDownload size={16} aria-hidden className="shrink-0 transition-transform duration-300 group-hover:translate-y-0.5" />
      <span className={iconOnly ? 'sr-only' : ''}>Brochure</span>
    </button>
  )
}
