'use client'

import { useEffect, useRef } from 'react'
import { gsap, MOTION, ScrollTrigger } from '@/lib/gsap'

/**
 * Re-mounts on every navigation: a very short opacity fade (opacity only, so
 * pinned/fixed children are never affected) and a ScrollTrigger refresh once
 * the new page has laid out. Navigation is never blocked.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mm = gsap.matchMedia()
    mm.add(MOTION, () => {
      gsap.fromTo(ref.current, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: 'power2.out', clearProps: 'opacity' })
    })
    const t = window.setTimeout(() => ScrollTrigger.refresh(), 600)
    return () => {
      window.clearTimeout(t)
      mm.revert()
    }
  }, [])

  return <div ref={ref}>{children}</div>
}
