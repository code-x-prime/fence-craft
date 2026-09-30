'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import { gsap, MOTION, REDUCED } from '@/lib/gsap'
import { ParallaxImage } from '@/components/animations/ParallaxImage'

export type RevealDir = 'up' | 'down' | 'left' | 'right'

const CLOSED: Record<RevealDir, string> = {
  up: 'inset(100% 0% 0% 0%)',
  down: 'inset(0% 0% 100% 0%)',
  left: 'inset(0% 100% 0% 0%)',
  right: 'inset(0% 0% 0% 100%)',
}

/**
 * The site's one large-image treatment. On scroll: opacity 0 → 1, scale
 * 1.06 → 1 and a clip-path wipe (default: bottom to top), about 1.3s,
 * power3.out. A very subtle parallax runs inside on tablet/desktop only.
 * Size it (and position it) with `className`, e.g. "relative h-[280px] lg:h-[480px]".
 */
export function RevealImage({
  children,
  dir = 'up',
  parallax = 0.04,
  className = '',
}: {
  children: ReactNode
  dir?: RevealDir
  parallax?: number
  className?: string
}) {
  const outer = useRef<HTMLDivElement>(null)
  const inner = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = outer.current
    if (!el) return
    const mm = gsap.matchMedia()
    const trigger = { trigger: el, start: 'top 85%', once: true }
    mm.add(MOTION, () => {
      gsap.fromTo(
        el,
        { clipPath: CLOSED[dir], opacity: 0 },
        { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1, duration: 1.3, ease: 'power3.out', scrollTrigger: trigger },
      )
      gsap.fromTo(inner.current, { scale: 1.06 }, { scale: 1, duration: 1.4, ease: 'power3.out', scrollTrigger: trigger })
    })
    mm.add(REDUCED, () => {
      gsap.to(el, { opacity: 1, duration: 0.6, scrollTrigger: trigger })
    })
    return () => mm.revert()
  }, [dir])

  return (
    <div ref={outer} data-ri={dir} className={`overflow-hidden ${className}`}>
      <div ref={inner} className="absolute inset-0">
        {parallax > 0 ? <ParallaxImage strength={parallax}>{children}</ParallaxImage> : children}
      </div>
    </div>
  )
}
