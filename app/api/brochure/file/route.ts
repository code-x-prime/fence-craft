import { BROCHURE_FILE_NAME, BROCHURE_REMOTE_URL } from '@/lib/brochure'

export const dynamic = 'force-dynamic'

/**
 * Streams the brochure with `Content-Disposition: attachment` so the browser
 * downloads it instead of opening it (a plain cross-origin link can't force that).
 */
export async function GET() {
  const upstream = await fetch(BROCHURE_REMOTE_URL)
  if (!upstream.ok || !upstream.body) {
    return new Response('Brochure is temporarily unavailable.', { status: 502 })
  }
  const headers = new Headers({
    'Content-Type': 'application/pdf',
    'Content-Disposition': `attachment; filename="${BROCHURE_FILE_NAME}"`,
    'Cache-Control': 'public, max-age=3600',
  })
  const length = upstream.headers.get('content-length')
  if (length) headers.set('Content-Length', length)
  return new Response(upstream.body, { headers })
}
