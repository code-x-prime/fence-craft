import { FadeIn } from '@/components/animations/FadeIn'
import { RevealText } from '@/components/animations/RevealText'
import { ProductCategory } from '@/components/sections/ProductCategory'
import { BrandButton } from '@/components/ui/brand-button'
import { categories } from '@/lib/products'

/** Home product range: heading, then four category rows with ONE image each (alternating sides). */
export function ProductShowcase() {
  return (
    <>
      <section aria-labelledby="products-title" className="bg-paper pt-14 sm:pt-18 lg:pt-24">
        <div className="wrap">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <FadeIn>
              <p className="eyebrow text-teal">Products</p>
            </FadeIn>
            <RevealText
              as="h2"
              lines={['Explore the', 'product range.']}
              className="display mt-4 h-section leading-[1.02] text-slate"
            />
            <span id="products-title" className="sr-only">
              Our product range
            </span>
          </div>
          <FadeIn className="lg:col-span-4">
            <p className="max-w-md text-base leading-relaxed text-muted">
              Reliable materials for security, construction, industrial and general fencing applications.
            </p>
            <div className="mt-5">
              <BrandButton href="/products" variant="dark">
                View All Products
              </BrandButton>
            </div>
          </FadeIn>
        </div>

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
    </>
  )
}
