import Image from 'next/image'
import type { ReactNode } from 'react'
import { FadeIn } from '@/components/animations/FadeIn'
import { RevealImage, type RevealDir } from '@/components/animations/RevealImage'
import { SectionHeading } from '@/components/sections/SectionHeading'

type Props = {
  eyebrow: string
  lines: string[]
  paragraphs: string[]
  image: { src: string; alt: string }
  flip?: boolean
  tone?: 'light' | 'dark'
  dir?: RevealDir
  children?: ReactNode
}

/** Text + image split section. `flip` swaps sides; `tone` picks the light or dark ground. */
export function SplitContent({ eyebrow, lines, paragraphs, image, flip = false, tone = 'light', dir = 'up', children }: Props) {
  const dark = tone === 'dark'
  return (
    <section className={`section-y ${dark ? 'bg-deep text-white' : 'bg-paper text-ink'}`}>
      <div className="wrap grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-14">
        <div className={`lg:col-span-6 ${flip ? 'lg:order-2' : ''}`}>
          <SectionHeading eyebrow={eyebrow} lines={lines} tone={tone} size="md" />
          <FadeIn group className={`mt-6 max-w-xl space-y-5 text-base leading-relaxed md:text-lg ${dark ? 'text-white/70' : 'text-ink/75'}`}>
            {paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </FadeIn>
          {children && <FadeIn className="mt-8 flex flex-col gap-3 sm:flex-row">{children}</FadeIn>}
        </div>
        <div className={`lg:col-span-6 ${flip ? 'lg:order-1' : ''}`}>
          <RevealImage dir={dir} className="group relative h-[280px] bg-deep sm:h-[360px] lg:h-[500px]">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.035]"
            />
          </RevealImage>
        </div>
      </div>
    </section>
  )
}
