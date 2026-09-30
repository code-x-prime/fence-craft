import type { Metadata } from 'next'
import { FadeIn } from '@/components/animations/FadeIn'
import { ContactForm } from '@/components/contact-form'
import { ContactDetails } from '@/components/sections/ContactDetails'
import { PageHero } from '@/components/sections/PageHero'
import { SectionHeading } from '@/components/sections/SectionHeading'
import { getCategory, getProduct } from '@/lib/products'
import { siteImages } from '@/lib/site-images'

export const metadata: Metadata = {
  title: 'Contact FENCECRAFT | Fencing & Wire Mesh',
  description:
    'Contact FENCECRAFT at C-182, Sec-2, Bawana Industrial Area, Delhi-110039. Call 9811812122, WhatsApp 7011087500 or email info@fencecraft.in.',
  alternates: { canonical: '/contact' },
}

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ product?: string }> }) {
  const { product } = await searchParams
  // `?product=` may be a product slug, a category slug, or free text from a category link
  const preset = product ? (getProduct(product)?.name ?? getCategory(product)?.name ?? product) : ''

  return (
    <main>
      <PageHero
        eyebrow="Contact"
        title={["LET'S DISCUSS YOUR", 'FENCING REQUIREMENT.']}
        size="md"
        image={siteImages.contactHero}
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Contact' }]}
      />

      <section className="bg-paper section-y">
        <div className="wrap grid gap-10 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <SectionHeading eyebrow="Get in touch" lines={['FENCECRAFT']} size="md" as="h2" />
            <FadeIn>
              <p className="mt-3 text-sm font-bold uppercase tracking-[0.2em] text-muted">ENGINEERED TO PROTECT</p>
            </FadeIn>
            <div className="mt-12">
              <ContactDetails />
            </div>
          </div>

          <FadeIn className="lg:col-span-6">
            <div className="rounded-xl border border-slate/20 bg-deep p-6 text-white sm:p-9">
              <p className="eyebrow text-teal-soft">Send your requirement</p>
              <div className="mt-8">
                <ContactForm defaultRequirement={preset} />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  )
}
