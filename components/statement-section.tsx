'use client'

import { useEffect, useRef } from 'react'
import { gsap, DESKTOP_MOTION } from '@/lib/gsap'
import { FadeIn } from '@/components/animations/FadeIn'
import { RevealText } from '@/components/animations/RevealText'

const word = 'display block text-[clamp(2.25rem,1rem+6.6vw,6.25rem)] leading-[0.86]'

export function StatementSection() {
  const root = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = root.current
    if (!el) return
    const q = gsap.utils.selector(el)
    const mm = gsap.matchMedia()
    mm.add(DESKTOP_MOTION, () => {
      const st = { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true }
      gsap.to(q('[data-w="l"]'), { xPercent: -5, ease: 'none', scrollTrigger: st })
      gsap.to(q('[data-w="r"]'), { xPercent: 5, ease: 'none', scrollTrigger: st })
      gsap.to(q('[data-w="u"]'), { yPercent: -14, ease: 'none', scrollTrigger: st })
    })
    return () => mm.revert()
  }, [])

  return (
    <section
      ref={root}
      aria-label="Wire mesh. Fencing. Protection."
      className="relative overflow-x-clip bg-paper section-y"
    >
      <div className="wrap">
        <FadeIn>
          <p className="eyebrow text-teal">What we build</p>
        </FadeIn>

        <div className="mt-8 md:mt-12">
          <div data-w="l">
            <RevealText lines={['WIRE MESH.']} className={`${word} text-slate`} />
          </div>
          <div data-w="r" className="md:pl-[10vw]">
            <RevealText lines={['FENCING.']} className={`${word} outline-text text-slate`} />
          </div>
          <div data-w="u" className="md:pl-[3vw]">
            <RevealText lines={['PROTECTION.']} className={`${word} text-teal`} />
          </div>
        </div>

        <div className="mt-8 grid md:mt-12 md:grid-cols-12">
          <FadeIn className="md:col-span-6 md:col-start-7">
            <p className="text-xl font-semibold leading-snug text-ink md:text-[1.7rem]">
              Since 2016, FENCECRAFT has been building its product range around practical fencing requirements,
              dependable supply and consistent quality.
            </p>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
