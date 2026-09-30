import { IconMail, IconMapPin, IconBrandWhatsapp, IconPhone } from '@tabler/icons-react'
import { FadeIn } from '@/components/animations/FadeIn'
import { BrandButton } from '@/components/ui/brand-button'
import { site } from '@/lib/site'

/** Address / phone / WhatsApp / email rows plus the Google Maps button. Used on the homepage and /contact. */
export function ContactDetails({ showMap = true }: { showMap?: boolean }) {
  const rows = [
    {
      Icon: IconMapPin,
      label: 'Address',
      content: (
        <address className="not-italic leading-snug">
          {site.addressLines.map((l) => (
            <span key={l} className="block">
              {l}
            </span>
          ))}
        </address>
      ),
    },
    {
      Icon: IconPhone,
      label: 'Phone',
      content: (
        <a href={site.phoneHref} className="transition-colors hover:text-teal">
          {site.phone}
        </a>
      ),
    },
    {
      Icon: IconBrandWhatsapp,
      label: 'WhatsApp',
      content: (
        <a href={site.whatsappHref} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-teal">
          {site.whatsapp}
        </a>
      ),
    },
    {
      Icon: IconMail,
      label: 'Email',
      content: (
        <a href={site.emailHref} className="transition-colors hover:text-teal">
          {site.email}
        </a>
      ),
    },
  ]

  return (
    <div>
      <FadeIn as="dl" group className="border-t border-slate/25">
        {rows.map(({ Icon, label, content }) => (
          <div
            key={label}
            className="grid grid-cols-[auto_1fr] items-start gap-x-5 gap-y-1 border-b border-line py-5 sm:grid-cols-[auto_8rem_1fr] sm:items-center"
          >
            <Icon aria-hidden size={22} stroke={1.6} className="text-teal" />
            <dt className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted">{label}</dt>
            <dd className="col-start-2 text-lg font-bold text-slate sm:col-start-3 md:text-xl">{content}</dd>
          </div>
        ))}
      </FadeIn>
      {showMap && (
        <FadeIn className="mt-10">
          <BrandButton href={site.mapsHref} variant="dark" icon="up-right">
            Open in Google Maps
          </BrandButton>
        </FadeIn>
      )}
    </div>
  )
}
