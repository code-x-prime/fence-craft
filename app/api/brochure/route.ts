import { countryCodes } from '@/lib/brochure'
import { clean, sendAdminMail } from '@/lib/mailer'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return Response.json({ ok: false, error: 'Invalid request.' }, { status: 400 })
  }

  // honeypot: real visitors never fill this hidden field
  if (clean(body.website, 100)) return Response.json({ ok: true })

  const name = clean(body.name, 100)
  const email = clean(body.email, 160)
  const phone = clean(body.phone, 20).replace(/[^\d]/g, '')
  const code = clean(body.countryCode, 6)
  const page = clean(body.page, 200)

  if (name.length < 2) return Response.json({ ok: false, error: 'Please enter your name.' }, { status: 400 })
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return Response.json({ ok: false, error: 'Please enter a valid email address.' }, { status: 400 })
  if (!countryCodes.some((c) => c.code === code) || phone.length < 6 || phone.length > 14)
    return Response.json({ ok: false, error: 'Please enter a valid phone number.' }, { status: 400 })

  try {
    await sendAdminMail({
      subject: `Brochure download: ${name}`,
      heading: 'New brochure download request',
      replyTo: email,
      rows: [
        { label: 'Name', value: name },
        { label: 'Phone', value: `${code} ${phone}`, href: `tel:${code}${phone}` },
        { label: 'Email', value: email, href: `mailto:${email}` },
        { label: 'Page', value: page },
      ],
    })
  } catch (err) {
    console.error('[brochure] send failed', err instanceof Error ? err.message : err)
    return Response.json({ ok: false, error: 'Could not submit right now. Please try again shortly.' }, { status: 502 })
  }

  return Response.json({ ok: true })
}
