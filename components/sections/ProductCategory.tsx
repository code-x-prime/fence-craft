import Image from 'next/image'
import Link from 'next/link'
import { FadeIn } from '@/components/animations/FadeIn'
import { RevealImage } from '@/components/animations/RevealImage'
import { RevealText } from '@/components/animations/RevealText'
import { BrandButton } from '@/components/ui/brand-button'
import { productsInCategory, type Category } from '@/lib/products'

/**
 * One product category as a large editorial row: number, name, description,
 * linked product list and a VIEW PRODUCTS button. `compact` drops the list.
 */
export function ProductCategory({
  category,
  flip = false,
  compact = false,
}: {
  category: Category
  flip?: boolean
  compact?: boolean
}) {
  const items = productsInCategory(category.slug)
  return (
    <article className="group grid gap-6 border-t border-slate/25 py-8 lg:grid-cols-12 lg:gap-12 lg:py-12">
      <div className={`lg:col-span-7 ${flip ? 'lg:order-2' : ''}`}>
        <Link href={`/products/${category.slug}`} tabIndex={-1} aria-hidden data-cursor="View" className="block">
          <RevealImage className="group/img relative h-[280px] bg-deep sm:h-[360px] lg:h-[480px]">
            <Image
              src={category.image}
              alt={category.alt}
              fill
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="object-cover transition-transform duration-500 ease-out group-hover/img:scale-[1.035]"
            />
          </RevealImage>
        </Link>
      </div>

      <div className={`flex flex-col lg:col-span-5 ${flip ? 'lg:order-1' : ''}`}>
        <FadeIn>
          <span className="block h-num font-extrabold leading-[0.85] tracking-tighter text-teal">
            {category.number}
          </span>
        </FadeIn>
        <RevealText
          as="h3"
          lines={[`${category.code} — ${category.name}`.replace('PVC — PVC', 'PVC')]}
          className="mt-5 h-sub font-bold leading-[1.15] tracking-tight text-slate"
        />
        <FadeIn>
          <p className="mt-3 max-w-md text-[15px] leading-relaxed text-muted">{category.description}</p>
        </FadeIn>

        {!compact && (
          <FadeIn as="ul" group className="mt-6 border-t border-line">
            {items.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/products/${p.slug}`}
                  className="group/row flex flex-wrap items-center justify-between gap-2 border-b border-line py-3 text-ink transition-[padding,color] duration-300 hover:pl-2 hover:text-teal"
                >
                  <span className="flex items-center gap-3 text-[15px] font-semibold">
                    <span aria-hidden className="block h-px w-0 bg-teal transition-[width] duration-300 group-hover/row:w-4" />
                    {p.name}
                  </span>
                  {p.note && (
                    <span className="shrink-0 rounded-md border border-slate/25 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-slate">
                      {p.note}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </FadeIn>
        )}

        <FadeIn className="mt-8">
          <BrandButton href={`/products/${category.slug}`} variant="dark">
            View Products
          </BrandButton>
        </FadeIn>
      </div>
    </article>
  )
}
