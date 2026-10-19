import { FadeIn } from '@/components/animations/FadeIn'
import { RevealText } from '@/components/animations/RevealText'
import { BrandButton } from '@/components/ui/brand-button'
import { PortraitVideo } from '@/components/ui/portrait-video'

/**
 * Compact homepage band: light ground, a tilted portrait video card with a teal
 * offset block behind it, and a short line with a link to the About page.
 */
export function HomeVideo() {
  return (
    <section aria-label="Workshop video" className="relative isolate overflow-x-clip bg-paper-2 py-12 md:py-16">
      <div aria-hidden className="mesh-bg pointer-events-none absolute inset-0 -z-10 text-slate/[0.05]" />
      <div className="wrap grid items-center gap-8 md:grid-cols-12 md:gap-12">
        <div className="order-2 md:order-1 md:col-span-7">
          <FadeIn>
            <p className="eyebrow text-teal">Inside FENCECRAFT</p>
          </FadeIn>
          <RevealText
            as="h2"
            lines={['Made with care.', 'Supplied Pan India.']}
            className="display mt-3 h-statement leading-[0.95] text-slate"
          />
          <FadeIn>
            <p className="mt-6 max-w-md text-base leading-relaxed text-ink/75 md:text-lg">
              Watch a quick look at the machinery and material behind our wire mesh and fencing, backed by S.B. ENTERPRISES in Delhi NCR.
            </p>
            <div className="mt-6">
              <BrandButton href="/about" variant="secondary">
                Our Story
              </BrandButton>
            </div>
          </FadeIn>
        </div>

        <FadeIn className="order-1 mx-auto w-full max-w-[230px] md:order-2 md:col-span-5 md:max-w-[260px] md:justify-self-center">
          <div className="relative">
            <div aria-hidden className="absolute -bottom-3 -right-3 h-full w-full rounded-xl bg-teal/90" />
            <PortraitVideo className="rotate-0 md:rotate-[2deg]" />
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
