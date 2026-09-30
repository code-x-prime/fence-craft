import { FadeIn } from '@/components/animations/FadeIn'
import { RevealText } from '@/components/animations/RevealText'

const blocks = [
  {
    from: 'left' as const,
    lines: ['OUR', 'VISION'],
    text: 'To establish FENCECRAFT as a trusted and recognized name in the fencing industry, known for quality, reliability and complete fencing solutions.',
  },
  {
    from: 'right' as const,
    lines: ['OUR', 'MISSION'],
    text: 'To provide reliable, cost-effective and quality fencing products and solutions, supported by dependable service and timely supply.',
  },
]

export function VisionMission() {
  return (
    <section aria-label="Vision and mission" className="relative isolate overflow-x-clip bg-paper">
      <div aria-hidden className="mesh-bg pointer-events-none absolute inset-0 -z-10 text-slate/[0.06]" />
      <div className="wrap grid divide-y divide-slate/20 md:grid-cols-2 md:divide-x md:divide-y-0">
        {blocks.map((b, i) => (
          <FadeIn
            key={b.lines[1]}
            from={b.from}
            className={`section-y ${i === 0 ? 'md:pr-12 lg:pr-20' : 'md:pl-12 lg:pl-20'}`}
          >
            <p className="eyebrow text-teal">0{i + 1}</p>
            <RevealText
              as="h2"
              lines={b.lines}
              className="display mt-6 h-statement leading-[0.9] text-slate"
            />
            <p className="mt-10 max-w-lg text-xl font-semibold leading-snug text-ink md:text-2xl">{b.text}</p>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}
