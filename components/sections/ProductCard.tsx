import Link from 'next/link'
import { IconArrowRight } from '@tabler/icons-react'
import { getCategory, type Product } from '@/lib/products'

/**
 * A product as a linked text tile (no image, on purpose: pages that list many
 * products keep to one image per section). Category code, name, one line, arrow.
 */
export function ProductCard({ product }: { product: Product }) {
  const cat = getCategory(product.category)
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex h-full flex-col justify-between gap-6 border-t border-slate/25 py-6 transition-colors duration-300 hover:border-teal"
    >
      <div>
        <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-teal">
          {cat?.code}
          {product.note ? ` · ${product.note}` : ''}
        </p>
        <h3 className="mt-3 text-xl font-extrabold uppercase leading-tight tracking-tight text-slate">{product.name}</h3>
        <p className="mt-2 line-clamp-3 max-w-sm text-sm leading-relaxed text-muted">{product.description}</p>
      </div>
      <span className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.14em] text-slate transition-colors group-hover:text-teal">
        View product
        <IconArrowRight size={16} aria-hidden className="transition-transform duration-300 group-hover:translate-x-1.5" />
      </span>
    </Link>
  )
}
