import { FadeIn } from '@/components/animations/FadeIn'
import { RevealText } from '@/components/animations/RevealText'
import { ContactDetails } from '@/components/sections/ContactDetails'
import { BrandButton } from '@/components/ui/brand-button'
import { site } from '@/lib/site'

/** Homepage contact block: details + map link, with the full enquiry form on /contact. */
export function ContactSection() {
  return (
    <section aria-labelledby="contact-title" className="bg-paper section-y">
      <div className="wrap grid gap-10 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6">
          <FadeIn>
            <p className="eyebrow text-teal">Contact</p>
          </FadeIn>
          <RevealText
            as="h2"
            lines={[site.name]}
            className="display mt-6 h-section leading-[0.92] text-slate"
          />
          <span id="contact-title" className="sr-only">
            Contact FENCECRAFT
          </span>
          <FadeIn>
            <p className="mt-3 text-sm font-bold uppercase tracking-[0.2em] text-muted">{site.tagline}</p>
            <p className="mt-8 max-w-sm text-base leading-relaxed text-muted">
              Tell us about your fencing requirement and we will help you find the right product.
            </p>
            <div className="mt-8">
              <BrandButton href="/contact" variant="primary">
                Contact Us
              </BrandButton>
            </div>
          </FadeIn>
        </div>
        <div className="lg:col-span-6">
          <ContactDetails />
        </div>
      </div>
    </section>
  )
}
