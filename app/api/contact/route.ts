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
  const company = clean(body.company, 120)
  const phoneRaw = clean(body.phone, 24)
  const phone = phoneRaw.replace(/[^\d]/g, '')
  const email = clean(body.email, 160)
  const requirement = clean(body.requirement, 200)
  const message = clean(body.message, 2000)

  if (name.length < 2) return Response.json({ ok: false, error: 'Please enter your name.' }, { status: 400 })
  if (phone.length < 6 || phone.length > 15)
    return Response.json({ ok: false, error: 'Please enter a valid phone number.' }, { status: 400 })
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return Response.json({ ok: false, error: 'Please enter a valid email address.' }, { status: 400 })
  if (requirement.length < 2)
    return Response.json({ ok: false, error: 'Please tell us which product you need.' }, { status: 400 })

  try {
    await sendAdminMail({
      subject: `Website enquiry: ${requirement} (${name})`,
      heading: 'New enquiry from the Contact page',
      ...(email ? { replyTo: email } : {}),
      rows: [
        { label: 'Name', value: name },
        { label: 'Company', value: company },
        { label: 'Phone', value: phoneRaw, href: `tel:${phoneRaw.replace(/[^\d+]/g, '')}` },
        { label: 'Email', value: email, ...(email ? { href: `mailto:${email}` } : {}) },
        { label: 'Product / requirement', value: requirement },
        { label: 'Message', value: message },
      ],
    })
  } catch (err) {
    console.error('[contact] send failed', err instanceof Error ? err.message : err)
    return Response.json({ ok: false, error: 'Could not send your enquiry right now. Please try again or message us on WhatsApp.' }, { status: 502 })
  }

  return Response.json({ ok: true })
}
