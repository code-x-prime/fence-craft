import Image from 'next/image'
import Link from 'next/link'
import { FadeIn } from '@/components/animations/FadeIn'
import { RevealImage } from '@/components/animations/RevealImage'
import { RevealText } from '@/components/animations/RevealText'
import { getProduct } from '@/lib/products'
import type { Solution } from '@/lib/solutions'

/** One application as an asymmetric editorial row; the image column width alternates. */
export function SolutionBlock({ solution, index }: { solution: Solution; index: number }) {
  const odd = index % 2 === 1
  const related = solution.products.map((s) => getProduct(s)).filter((p) => !!p)
  return (
    <article className="grid gap-8 border-t border-slate/25 py-8 lg:grid-cols-12 lg:gap-12 lg:py-12">
      <div className={`${odd ? 'lg:order-2 lg:col-span-5 lg:col-start-8' : 'lg:col-span-7'}`}>
        <RevealImage
          className="group relative h-[280px] bg-deep sm:h-[360px] lg:h-[480px]"
        >
          <Image
            src={solution.image}
            alt={solution.alt}
            fill
            sizes={odd ? '(min-width: 1024px) 40vw, 100vw' : '(min-width: 1024px) 58vw, 100vw'}
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.035]"
          />
        </RevealImage>
      </div>

      <div className={`flex flex-col justify-center ${odd ? 'lg:col-span-6 lg:col-start-1 lg:row-start-1' : 'lg:col-span-5'}`}>
        <FadeIn>
          <span className="block h-num font-extrabold leading-[0.85] tracking-tighter text-teal">
            {solution.number}
          </span>
        </FadeIn>
        <RevealText
          as="h2"
          lines={[solution.title]}
          className="mt-5 h-sub font-extrabold leading-[1.02] tracking-tight text-slate"
        />
        <FadeIn>
          <p className="mt-4 max-w-md text-base leading-relaxed text-muted md:text-lg">{solution.text}</p>
          <p className="mt-8 text-[11px] font-bold uppercase tracking-[0.2em] text-slate">Relevant products</p>
        </FadeIn>
        <FadeIn as="ul" group className="mt-3 border-t border-line">
          {related.map((p) => (
            <li key={p!.slug}>
              <Link
                href={`/products/${p!.slug}`}
                className="group/row flex items-center gap-3 border-b border-line py-3 text-[15px] font-semibold text-ink transition-[padding,color] duration-300 hover:pl-2 hover:text-teal"
              >
                <span aria-hidden className="block h-px w-0 bg-teal transition-[width] duration-300 group-hover/row:w-4" />
                {p!.name}
              </Link>
            </li>
          ))}
        </FadeIn>
      </div>
    </article>
  )
}
