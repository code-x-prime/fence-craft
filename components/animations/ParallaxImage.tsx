'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import { gsap, DESKTOP_MOTION } from '@/lib/gsap'

/**
 * Fills its (positioned) parent with an oversized layer that drifts against the
 * scroll. `strength` is a fraction of the layer height (keep <= 0.08). Children
 * are absolutely positioned inside the layer, so `next/image fill` works.
 */
export function ParallaxImage({ children, strength = 0.05 }: { children: ReactNode; strength?: number }) {
  const wrap = useRef<HTMLDivElement>(null)
  const layer = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!wrap.current || !layer.current) return
    const mm = gsap.matchMedia()
    mm.add(DESKTOP_MOTION, () => {
      gsap.fromTo(
        layer.current,
        { yPercent: -strength * 100 },
        {
          yPercent: strength * 100,
          ease: 'none',
          scrollTrigger: { trigger: wrap.current, start: 'top bottom', end: 'bottom top', scrub: true },
        },
      )
    })
    return () => mm.revert()
  }, [strength])

  return (
    <div ref={wrap} className="absolute inset-0">
      <div ref={layer} className="absolute inset-x-0 -inset-y-[10%] will-change-transform">
        {children}
      </div>
    </div>
  )
}
