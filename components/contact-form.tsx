'use client'

import { useRef } from 'react'
import { BrandButton } from '@/components/ui/brand-button'
import { categories, products } from '@/lib/products'
import { site } from '@/lib/site'

const options = [
  ...categories.map((c) => `${c.code} — ${c.name}`),
  ...products.map((p) => p.name),
  'Not sure / need advice',
]

/**
 * Frontend-only enquiry form. There is no backend, so nothing is stored or
 * "sent" by this page: SEND ENQUIRY opens WhatsApp, and EMAIL INSTEAD opens the
 * visitor's mail app, each with the details pre-filled. To connect a real API
 * later, replace `compose` + the two handlers with a POST to the endpoint.
 */
export function ContactForm({ defaultRequirement = '' }: { defaultRequirement?: string }) {
  const form = useRef<HTMLFormElement>(null)

  function compose() {
    const d = new FormData(form.current!)
    const g = (k: string) => String(d.get(k) ?? '').trim()
    return [
      'Hello FENCECRAFT, I would like to enquire about a fencing requirement.',
      `Name: ${g('name')}`,
      g('company') && `Company: ${g('company')}`,
      `Phone: ${g('phone')}`,
      g('email') && `Email: ${g('email')}`,
      `Requirement: ${g('requirement')}`,
      g('message') && `Message: ${g('message')}`,
    ]
      .filter(Boolean)
      .join('\n')
  }

  function viaWhatsApp(e: React.FormEvent) {
    e.preventDefault()
    window.open(`${site.whatsappHref}?text=${encodeURIComponent(compose())}`, '_blank', 'noopener,noreferrer')
  }

  function viaEmail() {
    if (!form.current?.reportValidity()) return
    window.location.href = `${site.emailHref}?subject=${encodeURIComponent('Enquiry from FENCECRAFT website')}&body=${encodeURIComponent(compose())}`
  }

  return (
    <form ref={form} onSubmit={viaWhatsApp} className="grid gap-5 sm:grid-cols-2" aria-describedby="form-note">
      <label className="field">
        Name
        <input name="name" required autoComplete="name" placeholder="Your name" />
      </label>
      <label className="field">
        Company
        <input name="company" autoComplete="organization" placeholder="Company name" />
      </label>
      <label className="field">
        Phone
        <input name="phone" type="tel" required autoComplete="tel" inputMode="tel" placeholder="Your phone number" />
      </label>
      <label className="field">
        Email
        <input name="email" type="email" autoComplete="email" placeholder="you@company.com" />
      </label>
      <label className="field sm:col-span-2">
        Product / requirement
        <input
          name="requirement"
          required
          list="requirement-options"
          defaultValue={defaultRequirement}
          placeholder="Choose or type a product"
        />
        <datalist id="requirement-options">
          {options.map((o) => (
            <option key={o} value={o} />
          ))}
        </datalist>
      </label>
      <label className="field sm:col-span-2">
        Message
        <textarea name="message" rows={4} placeholder="Quantity, size, application or any other details" />
      </label>
      <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row">
        <BrandButton type="submit" variant="primary">
          Enquire on WhatsApp
        </BrandButton>
        <BrandButton type="button" variant="outline-light" onClick={viaEmail}>
          Email Instead
        </BrandButton>
      </div>
      <p id="form-note" className="text-xs leading-relaxed text-white/55 sm:col-span-2">
        Choose WhatsApp or email to review your enquiry and send it directly to our team.
      </p>
    </form>
  )
}
