import Image from 'next/image'
import { DrawLine } from '@/components/animations/DrawLine'
import { FadeIn } from '@/components/animations/FadeIn'
import { RevealImage } from '@/components/animations/RevealImage'
import { RevealText } from '@/components/animations/RevealText'
import { BrandButton } from '@/components/ui/brand-button'
import { siteImages } from '@/lib/site-images'
import { aboutSteps } from '@/lib/site'

const facts = [
  { big: '2016', label: 'Established' },
  { big: 'S.B. ENTERPRISES', label: 'Brand backing' },
  { big: 'DELHI NCR', label: 'Manufacturing / Supply base' },
]

/** About: one large image beside the story, then a text-only band. */
export function AboutSection() {
  const img = siteImages.about
  return (
    <>
      <section aria-labelledby="about-title" className="section-y bg-paper">
        <div className="wrap grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-14">
          <div className="lg:col-span-6">
            <RevealImage className="group relative h-[300px] bg-deep sm:h-[400px] lg:h-[540px]">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className={`object-cover transition-transform duration-500 ease-out group-hover:scale-[1.035] ${img.position ?? ''}`}
              />
            </RevealImage>
          </div>

          <div className="lg:col-span-6">
            <FadeIn>
              <p className="eyebrow text-teal">About FENCECRAFT</p>
            </FadeIn>
            <RevealText
              as="h2"
              lines={['Built on experience.', 'Focused on reliability.']}
              className="display mt-4 h-section-md leading-[1.02] text-slate"
            />
            <span id="about-title" className="sr-only">
              About FENCECRAFT
            </span>
            <FadeIn group className="mt-5 space-y-4">
              <p className="text-lg font-semibold leading-snug text-ink md:text-xl">
                From a simple garden enclosure to an industrial boundary, the right fencing starts with the right material.
              </p>
              <p className="text-sm leading-relaxed text-ink/70 md:text-base">
                Established in 2016 and backed by S.B. ENTERPRISES in Delhi NCR, FENCECRAFT manufactures and supplies
                wire mesh, security fencing and protective netting. Explore the range, compare applications and talk to us about your project.
              </p>
            </FadeIn>
            <FadeIn as="dl" group className="mt-6 grid border-t border-line sm:grid-cols-3">
              {facts.map((f) => (
                <div
                  key={f.label}
                  className="flex flex-col border-b border-line py-4 sm:border-b-0 sm:border-l sm:px-5 sm:first:border-l-0 sm:first:pl-0"
                >
                  <dt className="order-2 mt-1 text-[11px] font-bold uppercase tracking-[0.16em] text-muted">{f.label}</dt>
                  <dd className="text-xl font-extrabold tracking-tight text-slate">{f.big}</dd>
                </div>
              ))}
            </FadeIn>
            <FadeIn className="mt-7">
              <BrandButton href="/about" variant="dark">
                Learn More
              </BrandButton>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* text-only band: no image, on purpose */}
      <section aria-label="Built for real-world protection" className="section-y bg-paper-2">
        <div className="wrap">
          <FadeIn>
            <p className="eyebrow text-teal">The FENCECRAFT range</p>
          </FadeIn>
          <RevealText
            as="h2"
            lines={['Made for everyday', 'protection.']}
            className="display mt-4 h-section leading-[1.02] text-slate"
          />
          <ol className="mt-8 grid gap-x-8 gap-y-8 md:mt-10 md:grid-cols-2 lg:grid-cols-4">
            {aboutSteps.map((s) => (
              <li key={s.n}>
                <DrawLine className="bg-slate/30" />
                <FadeIn className="pt-4">
                  <p className="text-xs font-extrabold tracking-[0.2em] text-teal">{s.n}</p>
                  <h3 className="mt-2 text-xl font-extrabold uppercase leading-tight tracking-tight text-slate">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/70">{s.text}</p>
                </FadeIn>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  )
}
