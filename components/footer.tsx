import Link from 'next/link'
import { Logo } from '@/components/logo'
import { categories } from '@/lib/products'
import { nav, site } from '@/lib/site'

const link = 'text-white/80 transition-colors hover:text-teal-soft'
const heading = 'text-[11px] font-bold uppercase tracking-[0.18em] text-white/40'

/** The single global footer, rendered once by the root layout. */
export function Footer() {
  return (
    <footer className="bg-deeper pb-[calc(4.75rem+env(safe-area-inset-bottom))] text-white lg:pb-0">
      <div className="wrap grid gap-12 py-12 md:grid-cols-12 md:py-16">
        <div className="md:col-span-4">
          <Link href="/" aria-label="FENCECRAFT home" className="inline-block">
            <Logo onDark className="h-24" />
          </Link>
          <p className="mt-5 text-[11px] font-bold uppercase tracking-[0.2em] text-teal-soft">{site.tagline}</p>
        </div>

        <nav aria-label="Footer" className="md:col-span-2">
          <p className={heading}>Navigate</p>
          <ul className="mt-5 space-y-3 text-sm font-semibold">
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className={link}>
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Product categories" className="md:col-span-3">
          <p className={heading}>Products</p>
          <ul className="mt-5 space-y-3 text-sm font-semibold">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link href={`/products/${c.slug}`} className={link}>
                  {c.footerLabel}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-3">
          <p className={heading}>Contact</p>
          <address className="mt-5 space-y-3 text-sm not-italic leading-relaxed text-white/80">
            <p>
              <a href={site.mapsHref} target="_blank" rel="noopener noreferrer" className={link}>
                {site.addressLines.map((l) => (
                  <span key={l} className="block">
                    {l}
                  </span>
                ))}
              </a>
            </p>
            <p>
              <a href={site.phoneHref} className={link}>
                {site.phone}
              </a>
            </p>
            <p>
              <a href={site.whatsappHref} target="_blank" rel="noopener noreferrer" className={link}>
                {site.whatsapp} <span className="text-white/40">(WhatsApp)</span>
              </a>
            </p>
            <p>
              <a href={site.emailHref} className={link}>
                {site.email}
              </a>
            </p>
          </address>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="wrap flex flex-col gap-2 py-6 text-xs text-white/50 sm:flex-row sm:justify-between">
          <p>© 2026 FENCECRAFT. All rights reserved.</p>
          <p>A brand by {site.parent}.</p>
        </div>
      </div>
    </footer>
  )
}
