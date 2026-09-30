import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Manrope } from 'next/font/google'
import { CursorFollower } from '@/components/animations/CursorFollower'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { MobileActionBar } from '@/components/mobile-action-bar'
import { site } from '@/lib/site'
import { siteImages } from '@/lib/site-images'
import './globals.css'

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
})

// Every page sets its own title, description and canonical; these are fallbacks.
export const metadata: Metadata = {
  title: 'FENCECRAFT | Wire Mesh & Fencing Solutions',
  description:
    'FENCECRAFT, established in 2016, manufactures and supplies wire mesh, fencing products and complete fencing solutions from Delhi.',
  metadataBase: new URL('https://fencecraft.example'),
  openGraph: {
    title: 'FENCECRAFT | Engineered to Protect',
    description: 'Wire mesh, fencing products and complete fencing solutions from Delhi.',
    type: 'website',
    siteName: 'FENCECRAFT',
    images: [{ url: siteImages.hero.src, width: 2200, height: 1461, alt: siteImages.hero.alt }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FENCECRAFT | Engineered to Protect',
    description: 'Wire mesh, fencing products and complete fencing solutions from Delhi.',
  },
  icons: {
    icon: '/fav-fc.png',
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#344c59',
}

const organization = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: site.name,
  legalName: site.parent,
  slogan: site.tagline,
  foundingDate: String(site.established),
  email: site.email,
  telephone: '+91 9811812122',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'C-182, Sec-2, Bawana Industrial Area',
    addressLocality: 'Delhi',
    postalCode: '110039',
    addressCountry: 'IN',
  },
  hasMap: site.mapsHref,
  contactPoint: [{ '@type': 'ContactPoint', telephone: '+91 9811812122', contactType: 'sales', areaServed: 'IN' }],
}

// Adds `anim` + `motion` (or `reduce`) before first paint so reveal targets start
// hidden without a flash. Reduced-motion users get simple fades only.
const motionGate = `try{var d=document.documentElement;d.classList.add('anim',matchMedia('(prefers-reduced-motion: reduce)').matches?'reduce':'motion')}catch(e){}`

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={manrope.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionGate }} />
      </head>
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organization).replace(/</g, '\\u003c') }}
        />
        <Header />
        {children}
        <Footer />
        <MobileActionBar />
        <CursorFollower />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
