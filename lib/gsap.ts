import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger)

export { gsap, ScrollTrigger }

export const MOTION = '(prefers-reduced-motion: no-preference)'
export const REDUCED = '(prefers-reduced-motion: reduce)'
export const PINNED = '(min-width: 1024px) and (prefers-reduced-motion: no-preference)'
/** Scroll-scrubbed/parallax effects: tablet and up only. Phones get simple reveals. */
export const DESKTOP_MOTION = '(min-width: 768px) and (prefers-reduced-motion: no-preference)'
export const STACKED = '(max-width: 1023px) and (prefers-reduced-motion: no-preference)'
export const FINE_POINTER = '(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine)'
