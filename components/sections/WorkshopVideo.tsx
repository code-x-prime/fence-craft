import { FadeIn } from '@/components/animations/FadeIn'
import { RevealText } from '@/components/animations/RevealText'
import { PortraitVideo } from '@/components/ui/portrait-video'

/** About page: full section with the portrait workshop clip beside the heading. */
export function WorkshopVideo() {
  return (
    <section className="section-y bg-deep text-white">
      <div className="wrap grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <FadeIn>
            <p className="eyebrow text-teal-soft">On the floor</p>
          </FadeIn>
          <RevealText
            as="h2"
            lines={['See the work', 'in motion.']}
            className="display mt-4 h-statement leading-[0.95] text-white"
          />
          <FadeIn>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-white/75">
              A short look at the machinery and material behind FENCECRAFT products, supplied from Delhi NCR to customers Pan India.
            </p>
          </FadeIn>
        </div>

        <FadeIn className="mx-auto w-full max-w-[300px] lg:col-span-5 lg:max-w-[340px] lg:justify-self-center">
          <PortraitVideo />
        </FadeIn>
      </div>
    </section>
  )
}
