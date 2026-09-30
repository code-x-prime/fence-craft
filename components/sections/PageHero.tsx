'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import Image from 'next/image'
import { Breadcrumb, type Crumb } from '@/components/sections/Breadcrumb'
import { RevealText } from '@/components/animations/RevealText'
import { gsap, DESKTOP_MOTION, MOTION, REDUCED } from '@/lib/gsap'

const diagA = Array.from({ length: 9 }, (_, i) => `M${380 + i * 130} -20 L${1380 + i * 130} 980`)
const diagB = Array.from({ length: 9 }, (_, i) => `M${1100 + i * 130} -20 L${100 + i * 130} 980`)

type Props = {
  eyebrow: string
  /** One entry per visual line; the string(s) render inside the page's single <h1>. */
  title: string[]
  subtitle?: string
  description?: string
  image: { src: string; alt: string; position?: string }
  breadcrumb: Crumb[]
  size?: 'lg' | 'md'
  children?: ReactNode
}

/**
 * The one hero for every inner page: dark industrial composition, masked
 * photograph (clip-path reveal + parallax), drawn mesh lines, breadcrumb and
 * line-by-line title reveal. Content is passed in; the design never varies.
 */
export function PageHero({ eyebrow, title, subtitle, description, image, breadcrumb, size = 'lg', children }: Props) {
  const root = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = root.current
    if (!el) return
    const q = gsap.utils.selector(el)
    const mm = gsap.matchMedia()

    mm.add(MOTION, () => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.fromTo(
        q('[data-ph-img]'),
        { clipPath: 'inset(0% 0% 0% 100%)' },
        { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.7, ease: 'power4.inOut' },
        0,
      )
        .fromTo(q('[data-ph-in]'), { scale: 1.06 }, { scale: 1, duration: 2.2 }, 0)
        .fromTo(
          q('[data-ph-line]'),
          { strokeDashoffset: 1 },
          { strokeDashoffset: 0, duration: 2.2, stagger: 0.08, ease: 'power2.inOut' },
          0.3,
        )
        .fromTo(q('[data-ph-fade]'), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, stagger: 0.12 }, 0.6)
    })
    // scroll-linked drift: tablet and up only
    mm.add(DESKTOP_MOTION, () => {
      gsap
        .timeline({
          defaults: { ease: 'none' },
          scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: true },
        })
        .to(q('[data-ph-scroll]'), { yPercent: 8, scale: 1.04, duration: 1 }, 0)
        .to(q('[data-ph-content]'), { y: -30, opacity: 0.3, duration: 1 }, 0)
    })
    mm.add(REDUCED, () => {
      gsap.to(q('[data-ph-img], [data-ph-fade]'), { opacity: 1, duration: 0.6 })
    })
    return () => mm.revert()
  }, [])

  const titleSize =
    size === 'lg'
      ? 'h-page'
      : 'h-page-md'

  return (
    <section
      ref={root}
      className="relative isolate flex min-h-[480px] items-end overflow-hidden bg-deeper text-white sm:min-h-[520px] lg:min-h-[68svh]"
    >
      {/* photograph, blended into the dark ground */}
      <div data-ph-scroll className="absolute inset-0 will-change-transform">
        <div data-ph-img className="hero-mask absolute inset-0">
          <div data-ph-in className="absolute inset-0">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority
              sizes="100vw"
              className={`object-cover ${image.position ?? 'object-center'}`}
            />
            <div aria-hidden className="absolute inset-0 bg-deeper/35" />
          </div>
        </div>
      </div>

      <svg
        aria-hidden
        viewBox="0 0 1440 960"
        preserveAspectRatio="xMidYMid slice"
        className="pointer-events-none absolute inset-0 h-full w-full text-teal [mask-image:linear-gradient(100deg,transparent_30%,#000_75%)]"
      >
        <g fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3">
          {[...diagA, ...diagB].map((d, i) => (
            <path key={i} data-ph-line d={d} pathLength={1} strokeDasharray={1} vectorEffect="non-scaling-stroke" />
          ))}
        </g>
      </svg>
      <div aria-hidden className="grid-bg pointer-events-none absolute inset-0 text-white/[0.035]" />

      <div data-ph-content className="wrap relative z-10 w-full pb-10 pt-28 md:pb-12 lg:pb-14 lg:pt-32">
        <div data-ph-fade>
          <Breadcrumb items={breadcrumb} />
        </div>
        <p data-ph-fade className="eyebrow mt-6 text-teal-soft sm:mt-8">
          {eyebrow}
        </p>
        <RevealText
          as="h1"
          lines={title}
          start="load"
          delay={0.5}
          duration={1.3}
          className={`display mt-4 leading-[0.98] sm:mt-5 ${titleSize}`}
        />
        {subtitle && (
          <p data-ph-fade className="mt-5 max-w-2xl text-base font-semibold leading-snug text-white sm:text-lg md:text-xl">
            {subtitle}
          </p>
        )}
        {description && (
          <p data-ph-fade className="mt-3 max-w-xl text-sm leading-relaxed text-white/65 sm:text-base">
            {description}
          </p>
        )}
        {children && (
          <div data-ph-fade className="mt-6 flex flex-col gap-3 sm:flex-row">
            {children}
          </div>
        )}
      </div>
    </section>
  )
}
