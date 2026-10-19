import { FadeIn } from '@/components/animations/FadeIn'
import { BrandButton } from '@/components/ui/brand-button'
import { CTASection } from '@/components/sections/CTASection'
import { PageHero } from '@/components/sections/PageHero'
import { ProductCard } from '@/components/sections/ProductCard'
import { SectionHeading } from '@/components/sections/SectionHeading'
import { getCategory, relatedProducts, titleLines, type Product } from '@/lib/products'
import { productSpecs } from '@/lib/product-specs'
import { site } from '@/lib/site'

/** Detail page for one product. Only supplied facts are shown; specifications are by enquiry. */
export function ProductDetail({ product }: { product: Product }) {
  const category = getCategory(product.category)!
  const related = relatedProducts(product, 3)
  const specs = productSpecs[product.slug] ?? []
  const enquire = `/contact?product=${product.slug}`

  return (
    <main>
      <PageHero
        size="md"
        eyebrow={`${category.code} — ${category.name}`}
        title={titleLines(product.name, 16)}
        description={product.description}
        image={{ src: product.image, alt: product.alt }}
        light={product.lightImage}
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'Products', href: '/products' },
          { label: category.name, href: `/products/${category.slug}` },
          { label: product.name },
        ]}
      >
        <BrandButton href={enquire} variant="primary">
          Get a Quote
        </BrandButton>
        <BrandButton href={`/products/${category.slug}`} variant={product.lightImage ? 'secondary' : 'outline-light'}>
          View {category.code} Range
        </BrandButton>
      </PageHero>

      <section className="bg-paper section-y">
        <div className="wrap grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-6">
            <SectionHeading eyebrow="Overview" lines={['A closer look.']} size="md" />
            <FadeIn group className="mt-10 max-w-xl space-y-5">
              <p className="text-xl font-semibold leading-snug text-ink md:text-2xl">{product.description}</p>
              <p className="text-base leading-relaxed text-ink/70">
                Share your required mesh opening, wire size, quantity and delivery location. Our team can confirm available specifications and help you choose a suitable option for your application.
              </p>
            </FadeIn>

            <FadeIn as="dl" group className="mt-10 border-t border-line">
              <div className="flex justify-between gap-6 border-b border-line py-4">
                <dt className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted">Category</dt>
                <dd className="text-right font-bold text-slate">
                  {category.code} — {category.name}
                </dd>
              </div>
              {product.note && (
                <div className="flex justify-between gap-6 border-b border-line py-4">
                  <dt className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted">Grades</dt>
                  <dd className="text-right font-bold text-slate">{product.note.replace('Grades ', '')}</dd>
                </div>
              )}
            </FadeIn>
          </div>

          <div className="lg:col-span-6">
            <SectionHeading eyebrow="Applications" lines={['Where it works.']} size="md" />
            <FadeIn as="ol" group className="mt-10 border-t border-slate/25">
              {product.applications.map((a, i) => (
                <li key={a} className="flex items-baseline gap-6 border-b border-line py-5">
                  <span className="text-xs font-extrabold tracking-[0.2em] text-teal">0{i + 1}</span>
                  <span className="text-lg font-semibold text-slate md:text-xl">{a}</span>
                </li>
              ))}
            </FadeIn>
          </div>
        </div>
      </section>

      {specs.length > 0 && (
        <section className="bg-paper-2 section-y">
          <div className="wrap">
            <SectionHeading eyebrow="Specification" lines={['Details at a glance.']} size="md" />
            <FadeIn as="dl" group className="mt-10 max-w-4xl border-t border-slate/25">
              {specs.map(([label, value]) => (
                <div key={label} className="grid gap-1 border-b border-line py-4 sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] sm:gap-8">
                  <dt className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted">{label}</dt>
                  <dd className="font-bold text-slate">{value}</dd>
                </div>
              ))}
            </FadeIn>
            <p className="mt-6 text-sm font-semibold text-muted">Can be customised as per the requirement.</p>
          </div>
        </section>
      )}

      <section className="bg-paper-2 section-y">
        <div className="wrap">
          <SectionHeading
            eyebrow="Related products"
            lines={['Complete your', 'requirement.']}
            size="md"
            split
            description="Other products that are commonly specified alongside this one."
          />
          <FadeIn group className="mt-8 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </FadeIn>
        </div>
      </section>

      <CTASection
        lines={['Find your', 'specification.']}
        text={`Contact us for specifications and availability on ${product.name}.`}
        primary={{ label: 'Get a Quote', href: enquire }}
        secondary={{ label: 'WhatsApp Us', href: site.whatsappHref }}
      />
    </main>
  )
}
