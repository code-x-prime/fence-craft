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
      className="relative isolate flex h-[80svh] max-h-[900px] min-h-[540px] items-center overflow-hidden bg-deeper text-white md:h-[92svh] lg:h-[100svh] lg:max-h-[960px]"
    >
      <div data-h-scroll className="absolute inset-0 will-change-transform">
        <div data-h-mouse className="absolute -inset-[4%]">
          <div data-h-intro className="hero-mask absolute inset-0">
            <Image
              src={img.src}
              alt={img.alt}
              fill
              priority
              sizes="100vw"
              className={`object-cover ${img.position ?? ''}`}
            />
          </div>
        </div>
      </div>

      <div data-h-veil aria-hidden className="pointer-events-none absolute inset-0 z-20 bg-paper opacity-0" />

      <div className="wrap relative z-10 pb-10 pt-24">
        <div data-h-content className="max-w-[44rem]">
          <p data-h-label data-h-fade className="eyebrow text-teal-soft">
            Est. 2016 · S.B. Enterprises
          </p>

          <h1 className="display mt-5 leading-[0.92]">
            <RevealText
              as="span"
              lines={['ENGINEERED TO']}
              chars
              start="load"
              delay={0.6}
              duration={1.2}
              stagger={0.04}
              className="block text-[clamp(1.5rem,0.7rem+3.6vw,3rem)] text-white/90"
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
              className="mt-1 block text-[clamp(3rem,1rem+9.2vw,7.5rem)] text-white"
            />
          </h1>

          <p data-h-cta data-h-fade className="mt-6 max-w-md text-base leading-relaxed text-white/75 md:text-lg">
            Wire mesh and fencing solutions built around quality, reliability and dependable supply.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <span data-h-cta data-h-fade className="flex">
              <BrandButton href="/products" variant="primary" className="flex-1">
                Explore Products
              </BrandButton>
            </span>
            <span data-h-cta data-h-fade className="flex">
              <BrandButton href="/contact" variant="outline-light" className="flex-1">
                Get a Quote
              </BrandButton>
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
