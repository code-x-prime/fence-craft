import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'
import { CursorFollower } from '@/components/animations/CursorFollower'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { MobileActionBar } from '@/components/mobile-action-bar'
import { site } from '@/lib/site'
import { siteImages } from '@/lib/site-images'
import './globals.css'

const archivo = localFont({
  src: '../public/fonts/Archivo-Variable.ttf',
  weight: '100 900',
  style: 'normal',
  variable: '--font-archivo',
  display: 'swap',
})

const poppins = localFont({
  src: [
    { path: '../public/fonts/Poppins-Regular.ttf', weight: '400', style: 'normal' },
    { path: '../public/fonts/Poppins-Medium.ttf', weight: '500', style: 'normal' },
    { path: '../public/fonts/Poppins-SemiBold.ttf', weight: '600', style: 'normal' },
    { path: '../public/fonts/Poppins-Bold.ttf', weight: '700', style: 'normal' },
  ],
  variable: '--font-poppins',
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
    images: [{ url: siteImages.hero.src, width: 1536, height: 1024, alt: siteImages.hero.alt }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FENCECRAFT | Engineered to Protect',
    description: 'Wire mesh, fencing products and complete fencing solutions from Delhi.',
  },
  icons: {
    icon: '/fav-fc.png',
    apple: '/fav-fc.png',
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${archivo.variable}`}>
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
