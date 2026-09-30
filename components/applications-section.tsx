import Image from 'next/image'
import Link from 'next/link'
import { IconArrowUpRight } from '@tabler/icons-react'
import { FadeIn } from '@/components/animations/FadeIn'
import { RevealImage } from '@/components/animations/RevealImage'
import { RevealText } from '@/components/animations/RevealText'
import { BrandButton } from '@/components/ui/brand-button'
import { siteImages } from '@/lib/site-images'
import { solutions } from '@/lib/solutions'

/** Home solutions: the six applications as a text list, with ONE image beside it. */
export function ApplicationsSection() {
  const img = siteImages.industrial
  return (
    <section aria-labelledby="solutions-title" className="section-y bg-paper-2">
      <div className="wrap grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-14">
        <div className="lg:col-span-6">
          <FadeIn>
            <p className="eyebrow text-teal">Solutions</p>
          </FadeIn>
          <RevealText
            as="h2"
            lines={['FENCING FOR EVERY', 'REQUIREMENT']}
            className="display mt-4 h-section-md leading-[1.02] text-slate"
          />
          <span id="solutions-title" className="sr-only">
            Fencing for every requirement
          </span>

          <FadeIn as="ol" group className="mt-6 border-t border-slate/25">
            {solutions.map((s) => (
              <li key={s.number}>
                <Link
                  href="/solutions"
                  className="group/row flex items-baseline gap-4 border-b border-line py-3.5 transition-[padding] duration-300 hover:pl-2"
                >
                  <span className="text-xs font-extrabold tracking-[0.2em] text-teal">{s.number}</span>
                  <span className="flex-1 text-base font-extrabold uppercase tracking-tight text-slate transition-colors group-hover/row:text-teal sm:text-lg">
                    {s.title}
                  </span>
                  <IconArrowUpRight size={16} aria-hidden className="shrink-0 text-slate/50 transition-colors group-hover/row:text-teal" />
                </Link>
              </li>
            ))}
          </FadeIn>
          <FadeIn className="mt-7">
            <BrandButton href="/solutions" variant="dark">
              Explore Solutions
            </BrandButton>
          </FadeIn>
        </div>

        <div className="lg:col-span-6">
          <RevealImage className="group relative h-[300px] bg-deep sm:h-[400px] lg:h-[540px]">
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className={`object-cover transition-transform duration-500 ease-out group-hover:scale-[1.035] ${img.position ?? ''}`}
            />
          </RevealImage>
        </div>
      </div>
    </section>
  )
}
