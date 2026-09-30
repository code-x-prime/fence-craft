import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { CategoryDetail } from '@/components/sections/CategoryDetail'
import { ProductDetail } from '@/components/sections/ProductDetail'
import { categories, getCategory, getProduct, products } from '@/lib/products'

type Params = { slug: string }

// One dynamic route serves both category landing pages and product detail pages.
export const dynamicParams = false

export function generateStaticParams(): Params[] {
  return [...categories.map((c) => ({ slug: c.slug })), ...products.map((p) => ({ slug: p.slug }))]
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params
  const product = getProduct(slug)
  if (product) {
    return {
      title: `${product.name} | FENCECRAFT`,
      description: `${product.description} Contact FENCECRAFT for specifications and availability.`,
      alternates: { canonical: `/products/${slug}` },
      openGraph: { images: [{ url: product.image, alt: product.alt }] },
    }
  }
  const category = getCategory(slug)
  if (category) {
    return {
      title: `${category.code} ${category.name} | FENCECRAFT`.replace('PVC PVC', 'PVC'),
      description: `${category.description} Browse the ${category.name} range from FENCECRAFT.`,
      alternates: { canonical: `/products/${slug}` },
      openGraph: { images: [{ url: category.image, alt: category.alt }] },
    }
  }
  return {}
}

export default async function ProductRoute({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const product = getProduct(slug)
  if (product) return <ProductDetail product={product} />
  const category = getCategory(slug)
  if (category) return <CategoryDetail category={category} />
  notFound()
}
