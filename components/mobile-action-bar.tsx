import Link from 'next/link'
import { IconBrandWhatsapp, IconPhone, IconSend } from '@tabler/icons-react'
import { site } from '@/lib/site'

const item =
  'flex min-h-12 flex-1 items-center justify-center gap-2 px-3 text-[12px] font-bold uppercase tracking-[0.12em] transition-colors active:bg-slate/10'

/**
 * Floating quick-contact bar for phones only (hidden from lg up). Call and
 * WhatsApp are real links; Enquire goes to the contact page and its form.
 */
export function MobileActionBar() {
  return (
    <div
      className="action-bar-in fixed inset-x-3 z-40 lg:hidden"
      style={{ bottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
    >
      <nav
        aria-label="Quick contact"
        className="flex overflow-hidden rounded-xl border border-slate/15 bg-paper/95 text-slate shadow-[0_8px_24px_rgba(15,26,32,0.18)] backdrop-blur-md"
      >
        <a href={site.phoneHref} className={item} aria-label={`Call ${site.phone}`}>
          <IconPhone size={16} aria-hidden /> Call
        </a>
        <a
          href={site.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className={`${item} border-x border-slate/15`}
          aria-label="Chat on WhatsApp"
        >
          <IconBrandWhatsapp size={16} aria-hidden /> WhatsApp
        </a>
        <Link href="/contact" className={`${item} bg-teal text-white active:bg-slate`}>
          <IconSend size={16} aria-hidden /> Enquire
        </Link>
      </nav>
    </div>
  )
}
