import Link from 'next/link'

export type Crumb = { label: string; href?: string }

/** Semantic breadcrumb trail. The last item is the current page and is not a link. */
export function Breadcrumb({ items, tone = 'dark' }: { items: Crumb[]; tone?: 'dark' | 'light' }) {
  const base = tone === 'dark' ? 'text-white/55' : 'text-muted'
  const hover = tone === 'dark' ? 'hover:text-teal-soft' : 'hover:text-teal'
  const current = tone === 'dark' ? 'text-white' : 'text-ink'
  return (
    <nav aria-label="Breadcrumb">
      <ol className={`flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-bold uppercase tracking-[0.18em] ${base}`}>
        {items.map((c, i) => {
          const last = i === items.length - 1
          return (
            <li key={c.label} className="flex items-center gap-3">
              {c.href && !last ? (
                <Link href={c.href} className={`transition-colors ${hover}`}>
                  {c.label}
                </Link>
              ) : (
                <span aria-current={last ? 'page' : undefined} className={last ? current : undefined}>
                  {c.label}
                </span>
              )}
              {!last && <span aria-hidden className="h-px w-4 bg-current opacity-50" />}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
