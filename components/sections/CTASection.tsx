import { FadeIn } from '@/components/animations/FadeIn'
import { ParallaxImage } from '@/components/animations/ParallaxImage'
import { RevealText } from '@/components/animations/RevealText'
import { BrandButton } from '@/components/ui/brand-button'
import { site } from '@/lib/site'

type Props = {
  lines?: string[]
  text?: string
  primary?: { label: string; href: string }
  secondary?: { label: string; href: string }
}

/** The one closing call-to-action, with a slowly drifting mesh and parallax layer. */
export function CTASection({
  lines = ['Good fencing starts', 'with a conversation.'],
  text = 'Tell us about your space, quantity and delivery location. We will help you find a suitable product and confirm the specifications.',
  primary = { label: 'Request a Quote', href: '/contact' },
  secondary = { label: 'WhatsApp Us', href: site.whatsappHref },
}: Props) {
  return (
    <section className="relative isolate overflow-hidden section-lg bg-slate text-white">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <ParallaxImage strength={0.08}>
          <div className="mesh-bg h-full w-full text-white/[0.09]" />
        </ParallaxImage>
        <div className="absolute inset-0 bg-gradient-to-t from-deep/60 to-transparent" />
      </div>

      <div className="wrap">
        <FadeIn>
          <p className="eyebrow text-teal-soft">Get a quote</p>
        </FadeIn>
        <RevealText
          as="h2"
          lines={lines}
          className="display mt-6 h-statement leading-[0.9]"
        />
        <div className="mt-8 grid gap-8 md:mt-12 md:grid-cols-12 md:items-end">
          <FadeIn className="md:col-span-5">
            <p className="max-w-sm text-lg leading-relaxed text-white/75">{text}</p>
          </FadeIn>
          <FadeIn className="flex flex-col gap-3 sm:flex-row md:col-span-7 md:justify-end">
            <BrandButton href={primary.href} variant="primary">
              {primary.label}
            </BrandButton>
            <BrandButton href={secondary.href} variant="outline-light">
              {secondary.label}
            </BrandButton>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
