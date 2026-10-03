import Link from 'next/link'
import Image from 'next/image'
import { IconArrowRight } from '@tabler/icons-react'
import { getCategory, type Product } from '@/lib/products'

/** A visual product card shared by category and related-product listings. */
export function ProductCard({ product }: { product: Product }) {
  const cat = getCategory(product.category)
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-white transition-colors duration-300 hover:border-teal"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-paper-2">
        <Image src={product.image} alt={product.alt} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
      </div>
      <div className="flex flex-1 flex-col justify-between gap-6 p-5 sm:p-6">
      <div>
        <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-teal">
          {cat?.code}
          {product.note ? ` · ${product.note}` : ''}
        </p>
        <h3 className="mt-3 text-xl font-bold leading-snug tracking-tight text-slate">{product.name}</h3>
        <p className="mt-2 line-clamp-3 max-w-sm text-sm leading-relaxed text-muted">{product.description}</p>
      </div>
      <span className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.14em] text-slate transition-colors group-hover:text-teal">
        View product
        <IconArrowRight size={16} aria-hidden className="transition-transform duration-300 group-hover:translate-x-1.5" />
      </span>
      </div>
    </Link>
  )
}
