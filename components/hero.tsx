'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { BrandButton } from '@/components/ui/brand-button'
import { RevealText } from '@/components/animations/RevealText'
import { gsap, ScrollTrigger, DESKTOP_MOTION, FINE_POINTER, MOTION, REDUCED } from '@/lib/gsap'
import { siteImages } from '@/lib/site-images'

/**
 * Home hero. Full-bleed photograph masked into the dark ground, with one
 * left-aligned content block: eyebrow, two-line headline, one sentence, two
 * buttons. No decoration strips, no scroll cue.
 */
export function Hero() {
  const root = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = root.current
    if (!el) return
    const q = gsap.utils.selector(el)
    const mm = gsap.matchMedia()

    // opening: photograph settles, eyebrow and CTAs follow the headline
    mm.add(MOTION, () => {
      gsap
        .timeline({ defaults: { ease: 'power3.out' } })
        .fromTo(q('[data-h-intro]'), { scale: 1.08, opacity: 0 }, { scale: 1, opacity: 1, duration: 2.2 }, 0)
        .fromTo(q('[data-h-label]'), { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.9 }, 0.3)
        .fromTo(q('[data-h-cta]'), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.9, stagger: 0.1 }, 1.3)
    })

    // scroll: the hero eases away into the next section (tablet and up)
    mm.add(DESKTOP_MOTION, () => {
      gsap
        .timeline({
          defaults: { ease: 'none' },
          scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: true },
        })
        .to(q('[data-h-scroll]'), { scale: 1.06, yPercent: 8, duration: 1 }, 0)
        .to(q('[data-h-content]'), { yPercent: -18, opacity: 0, duration: 0.75 }, 0.05)
        .to(q('[data-h-veil]'), { opacity: 1, duration: 0.5 }, 0.5)
    })

    mm.add(REDUCED, () => {
      gsap.to(q('[data-h-intro], [data-h-fade]'), { opacity: 1, duration: 0.8 })
    })

    // subtle pointer parallax on the photograph (fine pointers only)
    mm.add(FINE_POINTER, () => {
      const mouse = q('[data-h-mouse]')[0]
      const mx = gsap.quickTo(mouse, 'x', { duration: 1.6, ease: 'power3.out' })
      const my = gsap.quickTo(mouse, 'y', { duration: 1.6, ease: 'power3.out' })
      const move = (e: PointerEvent) => {
        mx((e.clientX / window.innerWidth - 0.5) * -28)
        my((e.clientY / window.innerHeight - 0.5) * -18)
      }
      el.addEventListener('pointermove', move)
      return () => el.removeEventListener('pointermove', move)
    })

    return () => mm.revert()
  }, [])

  useEffect(() => {
    const t = window.setTimeout(() => ScrollTrigger.refresh(), 400)
    return () => window.clearTimeout(t)
  }, [])

  const img = siteImages.hero

  return (
    <section
      id="top"
      ref={root}
      aria-label="FENCECRAFT, engineered to protect"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-deeper text-white"
    >
      {/* full-bleed photograph, no mask: sharp and clear */}
      <div data-h-scroll className="absolute inset-0 will-change-transform">
        <div data-h-mouse className="absolute -inset-[3%]">
          <div data-h-intro className="absolute inset-0">
            <Image
              src={img.src}
              alt={img.alt}
              fill
              preload
              quality={90}
              sizes="100vw"
              className={`object-cover ${img.position ?? ''}`}
            />
          </div>
        </div>
      </div>

      {/* legibility: dark from the left and bottom, photo stays bright on the right */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(15,26,32,0.88)_0%,rgba(15,26,32,0.55)_45%,rgba(15,26,32,0.05)_100%)] max-md:bg-[linear-gradient(180deg,rgba(15,26,32,0.55)_0%,rgba(15,26,32,0.78)_100%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-deeper/90 to-transparent"
      />

      <div data-h-veil aria-hidden className="pointer-events-none absolute inset-0 z-20 bg-paper opacity-0" />

      <div className="wrap relative z-10 flex flex-1 items-center pb-10 pt-28 md:pt-32">
        <div data-h-content className="max-w-[56rem]">
          <p data-h-label data-h-fade className="eyebrow text-teal-soft">
            Est. 2016 · S.B. Enterprises
          </p>

          <h1 className="display mt-6 leading-[0.9]">
            <RevealText
              as="span"
              lines={['ENGINEERED TO']}
              chars
              start="load"
              delay={0.6}
              duration={1.2}
              stagger={0.04}
              className="block text-[clamp(1.75rem,0.8rem+4.4vw,4rem)] text-white/90"
            />
            <RevealText
              as="span"
              lines={['PROTECT.']}
              chars
              accentDot
              start="load"
              delay={0.85}
              duration={1.4}
              stagger={0.06}
              className="mt-2 block text-[clamp(3.75rem,1rem+14vw,11.5rem)] text-white"
            />
          </h1>

          <p data-h-cta data-h-fade className="mt-8 max-w-xl text-base leading-relaxed text-white/80 md:text-xl">
            Wire mesh, security fencing and protective netting for factories, farms, homes and everything in between.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <span data-h-cta data-h-fade className="flex">
              <BrandButton href="/products" variant="primary" className="flex-1 sm:min-h-14 sm:px-8">
                Explore Products
              </BrandButton>
            </span>
            <span data-h-cta data-h-fade className="flex">
              <BrandButton href="/contact" variant="outline-light" className="flex-1 sm:min-h-14 sm:px-8">
                Get a Quote
              </BrandButton>
            </span>
          </div>
        </div>
      </div>

      {/* facts bar: company details only, nothing invented */}
      <div data-h-cta data-h-fade className="relative z-10 border-t border-white/15 bg-deeper/55 backdrop-blur-sm">
        <dl className="wrap grid grid-cols-3 divide-x divide-white/15 max-lg:pb-[4.75rem]">
          {[
            ['2016', 'Established'],
            ['Delhi NCR', 'Based'],
            ['Pan India', 'Supply'],
          ].map(([v, l]) => (
            <div key={l} className="px-3 py-4 first:pl-0 sm:px-6 sm:py-5">
              <dt className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/55 sm:text-[11px]">{l}</dt>
              <dd className="mt-1 text-base font-extrabold tracking-tight text-white sm:text-xl md:text-2xl">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
