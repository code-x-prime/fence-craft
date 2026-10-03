import Link from 'next/link'
import { FadeIn } from '@/components/animations/FadeIn'
import { BrandButton } from '@/components/ui/brand-button'
import { CTASection } from '@/components/sections/CTASection'
import { PageHero } from '@/components/sections/PageHero'
import { ProductCard } from '@/components/sections/ProductCard'
import { SectionHeading } from '@/components/sections/SectionHeading'
import { categories, productsInCategory, titleLines, type Category } from '@/lib/products'

/** Landing page for one product category: its products as linked tiles, plus the other categories. */
export function CategoryDetail({ category }: { category: Category }) {
  const items = productsInCategory(category.slug)
  const others = categories.filter((c) => c.slug !== category.slug)

  return (
    <main>
      <PageHero
        size="md"
        eyebrow={`Category ${category.number}`}
        title={titleLines(`${category.code} ${category.name}`.replace('PVC PVC', 'PVC'), 14)}
        description={category.description}
        image={{ src: category.image, alt: category.alt }}
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'Products', href: '/products' },
          { label: category.name },
        ]}
      >
        <BrandButton href={`/contact?product=${encodeURIComponent(category.code + ' — ' + category.name)}`} variant="primary">
          Get a Quote
        </BrandButton>
        <BrandButton href="/products" variant="outline-light">
          All Products
        </BrandButton>
      </PageHero>

      <section className="bg-paper section-y">
        <div className="wrap">
          <SectionHeading
            eyebrow={`${items.length} products`}
            lines={[`Explore the ${category.code} range.`]}
            size="md"
            split
            description="Select a product for its overview, applications and enquiry options."
          />
          <FadeIn group className="mt-8 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </FadeIn>
        </div>
      </section>

      <section className="border-t border-line bg-paper-2 section-sm">
        <div className="wrap">
          <SectionHeading eyebrow="Other categories" lines={['More materials to explore.']} size="md" />
          <FadeIn as="ul" group className="mt-12 border-t border-slate/25">
            {others.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/products/${c.slug}`}
                  className="group flex items-baseline gap-6 border-b border-line py-6 transition-[padding] duration-300 hover:pl-3"
                >
                  <span className="text-xs font-extrabold tracking-[0.2em] text-teal">{c.number}</span>
                  <span className="text-2xl font-extrabold uppercase tracking-tight text-slate transition-colors group-hover:text-teal md:text-4xl">
                    {c.code} — {c.name}
                  </span>
                </Link>
              </li>
            ))}
          </FadeIn>
        </div>
      </section>

      <CTASection />
    </main>
  )
}
