import nodemailer from 'nodemailer'
import { site } from '@/lib/site'

export const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!)

/** Trim and cap a user-supplied value; non-strings become an empty string. */
export const clean = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '')

export type MailRow = { label: string; value: string; href?: string }

export class MailConfigError extends Error {}

/**
 * Sends a "new lead" email to the admin inbox over the Brevo SMTP credentials in
 * `.env`. CONTACT_TO_EMAIL is the admin address; when it is empty the company
 * address shown on the site is used. Throws MailConfigError when SMTP is not set up.
 */
export async function sendAdminMail({
  subject,
  heading,
  rows,
  replyTo,
}: {
  subject: string
  heading: string
  rows: MailRow[]
  replyTo?: string
}) {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD, FROM_EMAIL, CONTACT_TO_EMAIL } = process.env
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASSWORD || !FROM_EMAIL) throw new MailConfigError('SMTP is not configured')

  const port = Number(SMTP_PORT) || 587
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASSWORD },
  })

  const when = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short' })
  const all = [...rows, { label: 'Time (IST)', value: when }]

  await transporter.sendMail({
    from: `"FENCECRAFT Website" <${FROM_EMAIL}>`,
    to: CONTACT_TO_EMAIL?.trim() || site.email,
    ...(replyTo ? { replyTo } : {}),
    subject,
    text: [heading, '', ...all.map((r) => `${r.label}: ${r.value || '-'}`)].join('\n'),
    html: `<div style="font-family:Arial,sans-serif;font-size:15px;color:#12191d">
      <h2 style="margin:0 0 12px">${esc(heading)}</h2>
      <table cellpadding="6" style="border-collapse:collapse">
        ${all
          .map(
            (r) =>
              `<tr><td style="vertical-align:top"><b>${esc(r.label)}</b></td><td>${
                r.href ? `<a href="${esc(r.href)}">${esc(r.value)}</a>` : esc(r.value || '-').replace(/\n/g, '<br>')
              }</td></tr>`,
          )
          .join('')}
      </table></div>`,
  })
}
