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
        title={['FENCING FOR', 'REAL-WORLD', 'APPLICATIONS']}
        size="md"
        subtitle="Fencing solutions for real-world applications."
        image={siteImages.solutionsHero}
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Solutions' }]}
      />

      <section className="bg-paper pt-14 sm:pt-18 lg:pt-24">
        <div className="wrap">
          <SectionHeading
            eyebrow="Six applications"
            lines={['FENCING FOR EVERY', 'REQUIREMENT']}
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
