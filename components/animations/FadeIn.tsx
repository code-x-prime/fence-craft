'use client'

import { useEffect, useRef, type ElementType, type ReactNode } from 'react'
import { gsap, MOTION, REDUCED } from '@/lib/gsap'

type Props = {
  as?: ElementType
  className?: string
  children: ReactNode
  from?: 'up' | 'left' | 'right'
  delay?: number
  /** Animate direct children one after another instead of the element itself. */
  group?: boolean
}

/** Scroll-triggered fade/slide. `from` lets editorial halves enter from opposite sides. */
export function FadeIn({ as: Tag = 'div', className, children, from = 'up', delay = 0, group = false }: Props) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const targets = group ? Array.from(el.children) : [el]
    const mm = gsap.matchMedia()
    const trigger = { trigger: el, start: 'top 88%', once: true }

    mm.add(MOTION, () => {
      gsap.fromTo(
        targets,
        { opacity: 0, x: from === 'left' ? -60 : from === 'right' ? 60 : 0, y: from === 'up' ? 32 : 0 },
        { opacity: 1, x: 0, y: 0, duration: 1.1, ease: 'power3.out', stagger: 0.1, delay, scrollTrigger: trigger },
      )
    })
    mm.add(REDUCED, () => {
      gsap.to(targets, { opacity: 1, duration: 0.6, delay, scrollTrigger: trigger })
    })
    return () => mm.revert()
  }, [from, delay, group])

  const attr = group ? { 'data-fade-group': '' } : { 'data-fade': '' }
  return (
    <Tag ref={ref} className={className} {...attr}>
      {children}
    </Tag>
  )
}
