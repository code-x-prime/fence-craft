import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { IconArrowUpRight } from '@tabler/icons-react'
import { DrawLine } from '@/components/animations/DrawLine'
import { FadeIn } from '@/components/animations/FadeIn'
import { RevealImage } from '@/components/animations/RevealImage'
import { RevealText } from '@/components/animations/RevealText'
import { VisionMission } from '@/components/vision-mission'
import { BrandButton } from '@/components/ui/brand-button'
import { CTASection } from '@/components/sections/CTASection'
import { PageHero } from '@/components/sections/PageHero'
import { SectionHeading } from '@/components/sections/SectionHeading'
import { SplitContent } from '@/components/sections/SplitContent'
import { categories, productsInCategory } from '@/lib/products'
import { siteImages } from '@/lib/site-images'

export const metadata: Metadata = {
  title: 'About FENCECRAFT | Wire Mesh & Fencing Company',
  description:
    'Established in 2016, FENCECRAFT is a trusted and growing brand specializing in wire mesh, fencing products and complete fencing solutions, backed by S.B. ENTERPRISES in Delhi.',
  alternates: { canonical: '/about' },
}

export default function AboutPage() {
  const est = siteImages.about
  return (
    <main>
      <PageHero
        eyebrow="About FENCECRAFT"
        title={['Practical experience.', 'Dependable fencing.']}
        subtitle="Built on experience. Focused on reliability."
        image={siteImages.aboutHero}
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'About' }]}
      />

      {/* 1 — established: one large image */}
      <section className="section-y bg-paper">
        <div className="wrap">
          <FadeIn>
            <p className="eyebrow text-teal">Our story</p>
          </FadeIn>
          <RevealText
            as="h2"
            lines={['Our story began', 'in 2016.']}
            className="display mt-4 h-statement leading-[0.95] text-slate"
          />
          <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-stretch lg:gap-14">
            <div className="flex flex-col justify-between gap-10 lg:col-span-5">
              <FadeIn>
                <p className="text-xl font-semibold leading-snug text-ink md:text-2xl">
                  Since 2016, FENCECRAFT has brought wire mesh, security fencing and protective netting together
                  in one practical range. Based in Delhi, we help customers choose products around the space they need to protect.
                </p>
              </FadeIn>
              <FadeIn as="dl" group className="border-t border-slate/25">
                {[
                  ['Established', '2016'],
                  ['Brand backing', 'S.B. ENTERPRISES'],
                  ['Manufacturing / supply base', 'DELHI'],
                ].map(([label, value]) => (
                  <div key={label} className="flex items-baseline justify-between gap-6 border-b border-line py-4">
                    <dt className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted">{label}</dt>
                    <dd className="text-right text-lg font-extrabold tracking-tight text-slate">{value}</dd>
                  </div>
                ))}
              </FadeIn>
            </div>
            <div className="lg:col-span-7">
              <RevealImage className="group relative h-[300px] bg-deep sm:h-[400px] lg:h-[500px]">
                <Image
                  src={est.src}
                  alt={est.alt}
                  fill
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  className={`object-cover transition-transform duration-500 ease-out group-hover:scale-[1.035] ${est.position ?? ''}`}
                />
              </RevealImage>
            </div>
          </div>
        </div>
      </section>

      {/* 2 — built around real requirements: one large image */}
      <SplitContent
        tone="dark"
        flip
        eyebrow="How we work"
        lines={['Built around', 'your requirements.']}
        paragraphs={[
          'Every requirement starts with the application: a factory boundary, a farm enclosure, a garden or a window screen. We help you narrow down the material and mesh type before discussing specifications and quantity.',
          'Our range includes welded and chain link mesh, hexagonal netting, PVC-coated products, barbed wire and concertina coils. FENCECRAFT is backed by S.B. ENTERPRISES in Delhi.',
        ]}
        image={siteImages.industrial}
      >
        <BrandButton href="/products" variant="primary">
          View Products
        </BrandButton>
      </SplitContent>

      {/* 3 — product expertise: text only, no images */}
      <section className="section-y bg-paper">
        <div className="wrap">
          <SectionHeading
            eyebrow="Product expertise"
            lines={['Know the material.', 'Choose with confidence.']}
            size="md"
            split
            description="Four material families, each with its own range of products."
          />
          <ol className="mt-8 md:mt-10">
            {categories.map((c) => (
              <li key={c.slug}>
                <DrawLine className="bg-slate/30" />
                <FadeIn className="grid items-baseline gap-x-8 gap-y-2 py-6 md:grid-cols-12">
                  <span className="text-xs font-extrabold tracking-[0.2em] text-teal md:col-span-1">{c.number}</span>
                  <h3 className="h-sub font-extrabold uppercase leading-tight tracking-tight text-slate md:col-span-5">
                    {c.code} — {c.name}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted md:col-span-4">
                    {productsInCategory(c.slug)
                      .map((p) => p.name)
                      .join(' · ')}
                  </p>
                  <Link
                    href={`/products/${c.slug}`}
                    className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.14em] text-slate transition-colors hover:text-teal md:col-span-2 md:justify-self-end"
                  >
                    View <IconArrowUpRight size={16} aria-hidden />
                  </Link>
                </FadeIn>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 4 — vision / mission */}
      <VisionMission />

      <CTASection lines={['Your boundary.', 'Our expertise.']} />
    </main>
  )
}
