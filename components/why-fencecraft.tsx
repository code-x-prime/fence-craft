import { DrawLine } from '@/components/animations/DrawLine'
import { FadeIn } from '@/components/animations/FadeIn'
import { RevealText } from '@/components/animations/RevealText'

const reasons = [
  { n: '01', title: 'CONSISTENT QUALITY', text: 'Reliable fencing products manufactured/supplied with focus on consistent quality.' },
  { n: '02', title: 'COMPETITIVE PRICING', text: 'Cost-effective solutions for different project requirements.' },
  { n: '03', title: 'RELIABLE SUPPLY', text: 'Responsive supply support and dependable service.' },
  { n: '04', title: 'TAILORED SOLUTIONS', text: 'Products and solutions based on specific customer and project requirements.' },
]

export function WhyFencecraft() {
  return (
    <section
      aria-labelledby="why-title"
      className="relative isolate overflow-hidden section-y bg-deep text-white"
    >
      <div aria-hidden className="grid-bg pointer-events-none absolute inset-0 -z-10 text-white/[0.035]" />
      <div className="wrap">
        <FadeIn>
          <p className="eyebrow text-teal-soft">The FENCECRAFT approach</p>
        </FadeIn>
        <RevealText
          as="h2"
          lines={['WHY', 'FENCECRAFT?']}
          chars
          accentDot
          stagger={0.03}
          className="display mt-6 h-statement leading-[0.86]"
        />
        <span id="why-title" className="sr-only">
          Why FENCECRAFT
        </span>

        <ol className="mt-10 md:mt-16">
          {reasons.map((r) => (
            <li key={r.n} className="group relative">
              <DrawLine />
              <div className="grid items-baseline gap-x-8 gap-y-2 py-5 md:grid-cols-12 md:py-7">
                <span className="text-sm font-extrabold tracking-[0.2em] text-teal-soft md:col-span-1">{r.n}</span>
                <RevealText
                  as="h3"
                  lines={[r.title]}
                  className="text-[clamp(1.375rem,1rem+1.9vw,2.75rem)] font-extrabold uppercase leading-none tracking-tight transition-transform duration-500 group-hover:translate-x-2 md:col-span-7"
                />
                <FadeIn className="md:col-span-4">
                  <p className="max-w-sm text-base leading-relaxed text-white/60">{r.text}</p>
                </FadeIn>
              </div>
            </li>
          ))}
          <li aria-hidden>
            <DrawLine />
          </li>
        </ol>
      </div>
    </section>
  )
}
