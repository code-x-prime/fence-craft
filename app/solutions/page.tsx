import type { Metadata } from 'next'
import { CTASection } from '@/components/sections/CTASection'
import { PageHero } from '@/components/sections/PageHero'
import { SectionHeading } from '@/components/sections/SectionHeading'
import { SolutionBlock } from '@/components/sections/SolutionBlock'
import { siteImages } from '@/lib/site-images'
import { solutions } from '@/lib/solutions'

export const metadata: Metadata = {
  title: 'Fencing Solutions | FENCECRAFT',
  description:
    'Fencing for industrial perimeters, security, construction, farms, homes and commercial sites: wire mesh and fencing products from FENCECRAFT, Delhi.',
  alternates: { canonical: '/solutions' },
}

export default function SolutionsPage() {
  return (
    <main>
      <PageHero
        eyebrow="Solutions"
        title={['The right fence.', 'For your space.']}
        size="md"
        subtitle="From factory perimeters to garden boundaries, explore fencing and netting by application."
        image={siteImages.solutionsHero}
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Solutions' }]}
      />

      <section className="bg-paper pt-14 sm:pt-18 lg:pt-24">
        <div className="wrap">
          <SectionHeading
            eyebrow="Six applications"
            lines={['Start with', 'your application.']}
            size="md"
            split
            description="A practical guide to where each type of fencing is commonly used, with the products that suit it."
          />
        </div>
      </section>

      {/* one section per application, one image each */}
      {solutions.map((s, i) => (
        <section key={s.number} aria-label={s.title} className={`bg-paper ${i === solutions.length - 1 ? 'pb-12 sm:pb-16 lg:pb-24' : ''}`}>
          <div className="wrap">
            <SolutionBlock solution={s} index={i} />
          </div>
        </section>
      ))}

      <CTASection />
    </main>
  )
}
