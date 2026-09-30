import type { Metadata } from 'next'
import { BrandButton } from '@/components/ui/brand-button'
import { PageHero } from '@/components/sections/PageHero'
import { siteImages } from '@/lib/site-images'

export const metadata: Metadata = {
  title: 'Page Not Found | FENCECRAFT',
  robots: { index: false },
}

export default function NotFound() {
  return (
    <main>
      <PageHero
        eyebrow="Page not found"
        title={['404']}
        subtitle="PAGE NOT FOUND"
        description="Looks like this path doesn't exist."
        image={siteImages.notFound}
        breadcrumb={[{ label: 'Home', href: '/' }, { label: '404' }]}
      >
        <BrandButton href="/" variant="primary">
          Back Home
        </BrandButton>
        <BrandButton href="/products" variant="outline-light">
          View Products
        </BrandButton>
      </PageHero>
    </main>
  )
}
