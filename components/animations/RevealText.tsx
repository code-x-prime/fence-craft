'use client'

import { Fragment, useEffect, useRef, type ElementType } from 'react'
import { gsap, MOTION, REDUCED } from '@/lib/gsap'

type Props = {
  /** One entry per visual line; each line slides up from inside its own mask. */
  lines: string[]
  as?: ElementType
  className?: string
  /** Split each line into characters (letter-by-letter reveal). */
  chars?: boolean
  /** Colour a trailing full stop in the brand teal. */
  accentDot?: boolean
  start?: 'scroll' | 'load'
  delay?: number
  stagger?: number
  duration?: number
}

/**
 * Framer/Awwwards-style text reveal: overflow-hidden mask per line, text rises
 * from yPercent 115. Screen readers get one plain sr-only string; the animated
 * copy is aria-hidden. Under reduced motion it is a plain opacity fade.
 */
export function RevealText({
  lines,
  as: Tag = 'span',
  className = '',
  chars = false,
  accentDot = false,
  start = 'scroll',
  delay = 0,
  stagger,
  duration = 0.9,
}: Props) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const mm = gsap.matchMedia()
    const units = el.querySelectorAll('[data-u]')
    const trigger = start === 'scroll' ? { trigger: el, start: 'top 88%', once: true } : undefined

    mm.add(MOTION, () => {
      gsap.fromTo(
        units,
        { yPercent: 100, opacity: 1 },
        {
          yPercent: 0,
          duration,
          ease: 'power4.out',
          stagger: stagger ?? (chars ? 0.04 : 0.12),
          delay,
          scrollTrigger: trigger,
        },
      )
    })
    mm.add(REDUCED, () => {
      gsap.to(units, { opacity: 1, duration: 0.6, delay, scrollTrigger: trigger })
    })
    return () => mm.revert()
  }, [start, delay, stagger, duration, chars])

  return (
    <Tag ref={ref} className={className}>
      <span className="sr-only">{lines.join(' ')}</span>
      <span aria-hidden className="block">
        {lines.map((line) => (
          <span key={line} className="-mb-[0.08em] block overflow-hidden pb-[0.08em]">
            {chars ? (
              line.split(' ').map((word, wi, words) => (
                <Fragment key={wi}>
                  <span className="inline-block whitespace-nowrap">
                    {[...word].map((c, ci) => (
                      <span
                        key={ci}
                        data-u
                        className={`inline-block ${accentDot && c === '.' ? 'text-teal' : ''}`}
                      >
                        {c}
                      </span>
                    ))}
                  </span>
                  {wi < words.length - 1 && ' '}
                </Fragment>
              ))
            ) : (
              <span data-u className="block">
                {line}
              </span>
            )}
          </span>
        ))}
      </span>
    </Tag>
  )
}
