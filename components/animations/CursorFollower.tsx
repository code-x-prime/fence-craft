'use client'

import { useEffect, useRef } from 'react'
import { gsap, FINE_POINTER } from '@/lib/gsap'

/**
 * A small label that trails the pointer only over elements marked
 * `data-cursor="Label"`. Desktop with a fine pointer + motion allowed only.
 */
export function CursorFollower() {
  const dot = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = dot.current
    if (!el) return
    const mm = gsap.matchMedia()
    mm.add(FINE_POINTER, () => {
      gsap.set(el, { xPercent: -50, yPercent: -50, scale: 0, opacity: 0 })
      const x = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' })
      const y = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' })
      let active = false

      const move = (e: PointerEvent) => {
        x(e.clientX)
        y(e.clientY)
        const target = (e.target as Element | null)?.closest<HTMLElement>('[data-cursor]')
        if (target && !active) {
          active = true
          el.textContent = target.dataset.cursor ?? ''
          gsap.to(el, { scale: 1, opacity: 1, duration: 0.35, ease: 'power3.out', overwrite: 'auto' })
        } else if (!target && active) {
          active = false
          gsap.to(el, { scale: 0, opacity: 0, duration: 0.3, ease: 'power3.in', overwrite: 'auto' })
        }
      }
      window.addEventListener('pointermove', move, { passive: true })
      return () => window.removeEventListener('pointermove', move)
    })
    return () => mm.revert()
  }, [])

  return (
    <div
      ref={dot}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[70] grid size-16 place-items-center rounded-full bg-teal text-[10px] font-extrabold uppercase tracking-[0.14em] text-white opacity-0"
    />
  )
}
