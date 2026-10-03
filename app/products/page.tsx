import type { Metadata } from 'next'
import { CTASection } from '@/components/sections/CTASection'
import { siteImages } from '@/lib/site-images'
import { PageHero } from '@/components/sections/PageHero'
import { ProductCategory } from '@/components/sections/ProductCategory'
import { SectionHeading } from '@/components/sections/SectionHeading'
import { categories } from '@/lib/products'

export const metadata: Metadata = {
  title: 'Wire Mesh & Fencing Products | FENCECRAFT',
  description:
    'Galvanized iron, stainless steel, aluminium and PVC-coated wire mesh and fencing products from FENCECRAFT, Delhi: concertina coil, razor barbed tape, chain link, welded mesh and more.',
  alternates: { canonical: '/products' },
}

export default function ProductsPage() {
  return (
    <main>
      <PageHero
        eyebrow="Products"
        title={['Materials that work.', 'Protection that lasts.']}
        subtitle="Explore wire mesh, security wire and protective netting across four material families."
        image={siteImages.productsHero}
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Products' }]}
      />

      <section className="bg-paper pt-14 sm:pt-18 lg:pt-24">
        <div className="wrap">
          <SectionHeading
            eyebrow="Four families"
            lines={['Four materials.', 'Every kind of boundary.']}
            size="md"
            split
            description="Reliable materials for security, construction, industrial and general fencing applications."
          />
        </div>
      </section>

      {/* one section per category, one image each, alternating sides */}
      {categories.map((c, i) => (
        <section key={c.slug} aria-label={c.name} className={`bg-paper ${i === categories.length - 1 ? 'pb-12 sm:pb-16 lg:pb-24' : ''}`}>
          <div className="wrap">
            <ProductCategory category={c} flip={i % 2 === 1} />
          </div>
        </section>
      ))}

      <CTASection />
    </main>
  )
}
