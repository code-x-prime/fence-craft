'use client'

import { createContext, useCallback, useContext, useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { IconCheck, IconDownload, IconSend, IconX } from '@tabler/icons-react'
import { BrandButton } from '@/components/ui/brand-button'
import { countryCodes } from '@/lib/brochure'

type Ctx = { open: () => void }
const BrochureContext = createContext<Ctx>({ open: () => {} })
export const useBrochure = () => useContext(BrochureContext)

type Status = 'idle' | 'sending' | 'done'

const label = 'text-[11px] font-bold uppercase tracking-[0.14em] text-muted'
const input =
  'mt-2 block w-full rounded-lg border border-line bg-paper px-4 py-3 text-[15px] text-ink placeholder:text-muted/60 transition-colors focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/20'

/**
 * Renders the one brochure dialog for the whole site (native <dialog>: focus
 * trap, Esc and backdrop handled by the browser) and exposes open() through
 * context so the header, mobile menu and footer buttons can all trigger it.
 * On submit the lead is emailed to the admin and the PDF download starts.
 */
export function BrochureProvider({ children }: { children: ReactNode }) {
  const dialog = useRef<HTMLDialogElement>(null)
  const form = useRef<HTMLFormElement>(null)
  const pathname = usePathname()
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')

  const open = useCallback(() => {
    setStatus('idle')
    setError('')
    form.current?.reset()
    dialog.current?.showModal()
    document.body.style.overflow = 'hidden'
  }, [])

  const close = useCallback(() => {
    dialog.current?.close()
  }, [])

  useEffect(() => {
    const el = dialog.current
    if (!el) return
    const onClose = () => {
      document.body.style.overflow = ''
    }
    el.addEventListener('close', onClose)
    return () => el.removeEventListener('close', onClose)
  }, [])

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (status === 'sending') return
    const d = new FormData(e.currentTarget)
    setStatus('sending')
    setError('')
    try {
      const res = await fetch('/api/brochure', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: d.get('name'),
          email: d.get('email'),
          phone: d.get('phone'),
          countryCode: d.get('countryCode'),
          website: d.get('website'),
          page: pathname,
        }),
      })
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string }
      if (!res.ok || !data.ok) throw new Error(data.error || 'Could not submit right now. Please try again.')
      // start the download
      const a = document.createElement('a')
      a.href = '/api/brochure/file'
      a.download = ''
      document.body.appendChild(a)
      a.click()
      a.remove()
      setStatus('done')
    } catch (err) {
      setStatus('idle')
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    }
  }

  return (
    <BrochureContext.Provider value={{ open }}>
      {children}
      <dialog
        ref={dialog}
        aria-labelledby="brochure-title"
        onClick={(e) => e.target === dialog.current && close()}
        className="brochure-dialog m-auto w-[calc(100%-2rem)] max-w-md overflow-hidden rounded-2xl border-0 bg-transparent p-0 text-ink outline-none backdrop:bg-deeper/70 backdrop:backdrop-blur-sm"
      >
        <div className="relative max-h-[calc(100svh-2rem)] overflow-y-auto overflow-x-hidden rounded-2xl border-t-4 border-teal bg-white px-6 pb-7 pt-8 shadow-2xl sm:px-8">
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute right-3 top-4 flex size-10 items-center justify-center rounded-lg text-muted transition-colors hover:bg-paper hover:text-ink"
          >
            <IconX size={20} aria-hidden />
          </button>

          <div className="mx-auto grid size-16 place-items-center rounded-full bg-teal/10 text-teal">
            {status === 'done' ? <IconCheck size={30} aria-hidden /> : <IconDownload size={30} aria-hidden />}
          </div>
          <h2 id="brochure-title" className="mt-4 text-center text-2xl font-extrabold tracking-tight text-slate">
            {status === 'done' ? 'Thank you' : 'Download Brochure'}
          </h2>

          {status === 'done' ? (
            <div className="mt-3 text-center">
              <p className="text-[15px] leading-relaxed text-muted">
                Your download has started. If it does not, use the button below.
              </p>
              <div className="mt-6 flex flex-col gap-3">
                <BrandButton href="/api/brochure/file" variant="primary" icon="none" className="w-full">
                  <IconDownload size={16} aria-hidden className="mr-2 inline" />
                  Download again
                </BrandButton>
                <button type="button" onClick={close} className="py-2 text-sm font-semibold text-muted hover:text-ink">
                  Close
                </button>
              </div>
            </div>
          ) : (
            <form ref={form} onSubmit={onSubmit} className="mt-1">
              <p className="text-center text-[15px] text-muted">Please fill in your details to download our brochure</p>

              <div className="mt-6 space-y-4">
                <label className="block">
                  <span className={label}>Full name *</span>
                  <input name="name" required minLength={2} maxLength={100} autoComplete="name" placeholder="Your name" className={input} />
                </label>

                <div>
                  <span className={label}>Phone number *</span>
                  <div className="mt-2 grid grid-cols-[6.5rem_minmax(0,1fr)] gap-2">
                    <select
                      name="countryCode"
                      defaultValue="+91"
                      aria-label="Country code"
                      className={`${input} !mt-0 min-w-0 px-3`}
                    >
                      {countryCodes.map((c) => (
                        <option key={c.code} value={c.code}>
                          {c.label}
                        </option>
                      ))}
                    </select>
                    <input
                      name="phone"
                      type="tel"
                      required
                      inputMode="numeric"
                      autoComplete="tel-national"
                      pattern="[0-9 ]{6,16}"
                      title="Enter digits only"
                      placeholder="Phone number"
                      className={`${input} !mt-0 min-w-0`}
                    />
                  </div>
                </div>

                <label className="block">
                  <span className={label}>Email address *</span>
                  <input name="email" type="email" required maxLength={160} autoComplete="email" placeholder="Your email address" className={input} />
                </label>

                {/* honeypot */}
                <input name="website" tabIndex={-1} autoComplete="off" aria-hidden className="absolute -left-[9999px] h-0 w-0 opacity-0" />
              </div>

              {error && (
                <p role="alert" className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                  {error}
                </p>
              )}

              <div className="mt-6">
                <BrandButton type="submit" variant="primary" icon="none" disabled={status === 'sending'} className="w-full">
                  {status === 'sending' ? 'Please wait...' : 'Download Brochure'}
                  {status !== 'sending' && <IconSend size={16} aria-hidden className="ml-2 inline" />}
                </BrandButton>
              </div>
            </form>
          )}
        </div>
      </dialog>
    </BrochureContext.Provider>
  )
}
