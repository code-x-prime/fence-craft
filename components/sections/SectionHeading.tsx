import { FadeIn } from '@/components/animations/FadeIn'
import { RevealText } from '@/components/animations/RevealText'

type Props = {
  eyebrow: string
  lines: string[]
  description?: string
  tone?: 'light' | 'dark'
  size?: 'lg' | 'md'
  /** Put the description in a second column on large screens. */
  split?: boolean
  as?: 'h1' | 'h2' | 'h3'
  className?: string
}

/** Eyebrow + masked line-by-line heading + optional description. The one section heading. */
export function SectionHeading({
  eyebrow,
  lines,
  description,
  tone = 'light',
  size = 'lg',
  split = false,
  as = 'h2',
  className = '',
}: Props) {
  const dark = tone === 'dark'
  const sizeCls = size === 'lg' ? 'h-section' : 'h-section-md'
  return (
    <div className={`${split ? 'grid gap-8 lg:grid-cols-12 lg:items-end' : ''} ${className}`}>
      <div className={split ? 'lg:col-span-8' : ''}>
        <FadeIn>
          <p className={`eyebrow ${dark ? 'text-teal-soft' : 'text-teal'}`}>{eyebrow}</p>
        </FadeIn>
        <RevealText
          as={as}
          lines={lines}
          className={`display mt-6 leading-[0.92] ${sizeCls} ${dark ? 'text-white' : 'text-slate'}`}
        />
      </div>
      {description && (
        <FadeIn className={split ? 'lg:col-span-4' : 'mt-8'}>
          <p className={`max-w-md text-base leading-relaxed md:text-lg ${dark ? 'text-white/65' : 'text-muted'}`}>
            {description}
          </p>
        </FadeIn>
      )}
    </div>
  )
}
