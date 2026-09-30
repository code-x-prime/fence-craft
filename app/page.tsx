import type { Metadata } from 'next'
import { AboutSection } from '@/components/about-section'
import { ApplicationsSection } from '@/components/applications-section'
import { ContactSection } from '@/components/contact-section'
import { Hero } from '@/components/hero'
import { ProductShowcase } from '@/components/product-showcase'
import { CTASection } from '@/components/sections/CTASection'
import { StatementSection } from '@/components/statement-section'
import { VisionMission } from '@/components/vision-mission'
import { WhyFencecraft } from '@/components/why-fencecraft'

export const metadata: Metadata = {
  title: 'FENCECRAFT | Wire Mesh & Fencing Solutions',
  description:
    'FENCECRAFT, established in 2016, manufactures and supplies wire mesh, fencing products and complete fencing solutions from Delhi.',
  alternates: { canonical: '/' },
}

export default function Home() {
  return (
    <main>
      <Hero />
      <StatementSection />
      <AboutSection />
      <ProductShowcase />
      <ApplicationsSection />
      <WhyFencecraft />
      <VisionMission />
      <CTASection />
      <ContactSection />
    </main>
  )
}
