'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { IconMenu2, IconX } from '@tabler/icons-react'
import { Logo } from '@/components/logo'
import { BrandButton } from '@/components/ui/brand-button'
import { gsap, MOTION } from '@/lib/gsap'
import { nav } from '@/lib/site'

/** The single global header. Every page opens on a dark hero, so it starts as a transparent overlay. */
export function Header() {
  const pathname = usePathname()
  const ref = useRef<HTMLElement>(null)
  const menu = useRef<HTMLDivElement>(null)
  const progress = useRef<HTMLSpanElement>(null)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  // solid state follows scroll position (passive listener: reliable at both ends of the page)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const solid = scrolled && !open

  // height eases with GSAP; colours transition in CSS
  useEffect(() => {
    if (!ref.current) return
    const tween = gsap.to(ref.current, { height: solid ? 64 : 76, duration: 0.4, ease: 'power3.out' })
    return () => {
      tween.kill()
    }
  }, [solid])

  useEffect(() => setOpen(false), [pathname])

  // thin scroll-progress line on the header's bottom edge (feedback, motion-safe only)
  useEffect(() => {
    const mm = gsap.matchMedia()
    mm.add(MOTION, () => {
      gsap.fromTo(
        progress.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: { trigger: document.documentElement, start: 'top top', end: 'bottom bottom', scrub: 0.3 },
        },
      )
    })
    return () => mm.revert()
  }, [pathname])

  // mobile menu: quick fade + staggered links (0.25–0.4s); instant under reduced motion
  useEffect(() => {
    const el = menu.current
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    gsap.killTweensOf(el)
    if (open) {
      gsap.to(el, { autoAlpha: 1, duration: reduce ? 0.01 : 0.35, ease: 'power2.out' })
      if (!reduce) {
        gsap.fromTo(
          el.querySelectorAll('[data-m]'),
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4, stagger: 0.05, delay: 0.05, ease: 'power3.out' },
        )
      }
    } else {
      gsap.to(el, { autoAlpha: 0, duration: reduce ? 0.01 : 0.25, ease: 'power2.in' })
    }
  }, [open])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href))

  return (
    <header
      ref={ref}
      style={{ height: 76 }}
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-300 ${
        solid
          ? 'border-line bg-paper/95 shadow-[0_1px_0_rgba(18,25,29,0.04)] backdrop-blur-md'
          : 'border-white/10 bg-deeper/55 backdrop-blur-md'
      }`}
    >
      <div className="wrap grid h-full grid-cols-[auto_1fr_auto] items-center gap-6">
        <Link href="/" aria-label="FENCECRAFT home" className="relative z-[60]">
          <Logo onDark={!solid} className={`transition-[height] duration-300 ${solid ? 'h-11' : 'h-14'}`} priority />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 justify-self-center lg:flex xl:gap-10">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? 'page' : undefined}
              className={`relative py-2 text-[12px] font-bold uppercase tracking-[0.14em] transition-colors after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:bg-teal after:transition-transform after:duration-300 hover:after:scale-x-100 ${
                solid ? 'text-ink hover:text-teal' : 'text-white/90 hover:text-white'
              } ${isActive(item.href) ? 'after:scale-x-100' : 'after:scale-x-0'}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden justify-self-end lg:block">
          <BrandButton href="/contact" variant="primary" className="!min-h-11 !px-5">
            Get a Quote
          </BrandButton>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          className={`relative z-[60] col-start-3 flex size-11 items-center justify-center justify-self-end rounded-xl border lg:hidden ${
            solid ? 'border-ink/30 text-ink' : 'border-white/40 text-white'
          }`}
        >
          {open ? <IconX size={20} aria-hidden /> : <IconMenu2 size={20} aria-hidden />}
        </button>
      </div>

      <span
        ref={progress}
        aria-hidden
        className="pointer-events-none absolute -bottom-px left-0 h-[2px] w-full origin-left scale-x-0 bg-teal"
      />

      <div
        id="mobile-menu"
        ref={menu}
        inert={!open}
        className="invisible fixed inset-0 z-[55] flex flex-col bg-deep px-4 pb-6 pt-24 text-white opacity-0 sm:px-6 lg:hidden"
      >
        <nav aria-label="Mobile" className="flex flex-1 flex-col">
          {nav.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              aria-current={isActive(item.href) ? 'page' : undefined}
              data-m
              className={`flex items-baseline gap-4 border-b border-white/15 py-4 text-3xl font-extrabold uppercase tracking-tight ${
                isActive(item.href) ? 'text-teal-soft' : ''
              }`}
            >
              <span className="text-xs font-bold tracking-[0.18em] text-teal-soft">0{i + 1}</span>
              {item.label}
            </Link>
          ))}
        </nav>
        <div data-m>
          <BrandButton href="/contact" className="w-full">
            Get a Quote
          </BrandButton>
        </div>
      </div>
    </header>
  )
}
