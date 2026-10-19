'use client'

import { useRef, useState, type FormEvent } from 'react'
import { IconCheck } from '@tabler/icons-react'
import { BrandButton } from '@/components/ui/brand-button'
import { categories, products } from '@/lib/products'
import { site } from '@/lib/site'

const options = [
  ...categories.map((c) => `${c.code} — ${c.name}`),
  ...products.map((p) => p.name),
  'Not sure / need advice',
]

type Status = 'idle' | 'sending' | 'done'

/**
 * Enquiry form. Submitting POSTs to /api/contact, which emails the admin inbox.
 * Success and failure are shown from the real response; WhatsApp stays as an
 * optional direct channel.
 */
export function ContactForm({ defaultRequirement = '' }: { defaultRequirement?: string }) {
  const form = useRef<HTMLFormElement>(null)
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (status === 'sending') return
    const d = new FormData(e.currentTarget)
    const v = (k: string) => String(d.get(k) ?? '')
    setStatus('sending')
    setError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: v('name'),
          company: v('company'),
          phone: v('phone'),
          email: v('email'),
          requirement: v('requirement'),
          message: v('message'),
          website: v('website'),
        }),
      })
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string }
      if (!res.ok || !data.ok) throw new Error(data.error || 'Could not send your enquiry. Please try again.')
      setStatus('done')
    } catch (err) {
      setStatus('idle')
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    }
  }

  if (status === 'done') {
    return (
      <div role="status" className="py-6 text-center sm:py-10">
        <div className="mx-auto grid size-16 place-items-center rounded-full bg-teal/20 text-teal-soft">
          <IconCheck size={30} aria-hidden />
        </div>
        <h3 className="mt-5 text-2xl font-extrabold tracking-tight text-white">Enquiry sent</h3>
        <p className="mx-auto mt-3 max-w-sm text-[15px] leading-relaxed text-white/70">
          Thank you. Our team has received your requirement and will get back to you shortly.
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="mt-6 text-sm font-semibold text-teal-soft underline-offset-4 hover:underline"
        >
          Send another enquiry
        </button>
      </div>
    )
  }

  return (
    <form ref={form} onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2">
      <label className="field">
        Name
        <input name="name" required minLength={2} maxLength={100} autoComplete="name" placeholder="Your name" />
      </label>
      <label className="field">
        Company
        <input name="company" maxLength={120} autoComplete="organization" placeholder="Company name" />
      </label>
      <label className="field">
        Phone
        <input name="phone" type="tel" required maxLength={24} autoComplete="tel" inputMode="tel" placeholder="Your phone number" />
      </label>
      <label className="field">
        Email
        <input name="email" type="email" maxLength={160} autoComplete="email" placeholder="you@company.com" />
      </label>
      <label className="field sm:col-span-2">
        Product / requirement
        <input
          name="requirement"
          required
          maxLength={200}
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
        <textarea name="message" rows={4} maxLength={2000} placeholder="Quantity, size, application or any other details" />
      </label>

      {/* honeypot */}
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden className="absolute -left-[9999px] h-0 w-0 opacity-0" />

      {error && (
        <p role="alert" className="rounded-lg bg-red-500/15 px-4 py-3 text-sm font-medium text-red-200 sm:col-span-2">
          {error}
        </p>
      )}

      <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row">
        <BrandButton type="submit" variant="primary" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending...' : 'Send Enquiry'}
        </BrandButton>
        <BrandButton href={site.whatsappHref} variant="outline-light" icon="up-right">
          WhatsApp Instead
        </BrandButton>
      </div>
    </form>
  )
}
