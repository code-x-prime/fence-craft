'use client'

import { useEffect, useRef } from 'react'
import { gsap, MOTION, REDUCED } from '@/lib/gsap'

/** A thin rule that draws in from the left when it enters the viewport. */
export function DrawLine({ className = 'bg-white/25' }: { className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const mm = gsap.matchMedia()
    const trigger = { trigger: el, start: 'top 92%', once: true }
    mm.add(MOTION, () => {
      gsap.fromTo(
        el,
        { scaleX: 0, opacity: 1 },
        { scaleX: 1, duration: 1.4, ease: 'power3.inOut', scrollTrigger: trigger },
      )
    })
    mm.add(REDUCED, () => {
      gsap.to(el, { opacity: 1, duration: 0.6, scrollTrigger: trigger })
    })
    return () => mm.revert()
  }, [])

  return <span ref={ref} data-draw aria-hidden className={`block h-px origin-left ${className}`} />
}
