import { siteImages } from '@/lib/site-images'

export type Solution = {
  number: string
  title: string
  text: string
  image: string
  alt: string
  products: string[] // product slugs
}

/** Practical, general descriptions only: no project or performance claims. */
export const solutions: Solution[] = [
  {
    number: '01',
    title: 'Industrial Perimeter',
    text: 'Boundary fencing for plants, warehouses and industrial premises.',
    image: siteImages.industrial.src,
    alt: siteImages.industrial.alt,
    products: ['chain-link-wire-mesh', 'welded-wire-mesh', 'barbed-wire'],
  },
  {
    number: '02',
    title: 'Security Fencing',
    text: 'Barbed wire, concertina coil and razor barbed tape for secure boundaries.',
    image: siteImages.security.src,
    alt: siteImages.security.alt,
    products: ['concertina-coil', 'rbt-razor-barbed-tape', 'barbed-wire'],
  },
  {
    number: '03',
    title: 'Construction',
    text: 'Site boundaries and enclosures that are quick to set up and easy to move.',
    image: siteImages.construction.src,
    alt: siteImages.construction.alt,
    products: ['welded-wire-mesh', 'chain-link-wire-mesh', 'shade-net'],
  },
  {
    number: '04',
    title: 'Agricultural & Farm',
    text: 'Enclosures for livestock, orchards and farm boundaries, plus netting for crops.',
    image: siteImages.agricultural.src,
    alt: siteImages.agricultural.alt,
    products: ['hexagonal-chicken-wire-mesh', 'barbed-wire', 'bird-net', 'shade-net'],
  },
  {
    number: '05',
    title: 'Residential / General',
    text: 'Garden, home and everyday boundary fencing and screening.',
    image: siteImages.residential.src,
    alt: siteImages.residential.alt,
    products: ['pvc-garden-mesh', 'welded-wire-mesh', 'mosquito-wire-mesh'],
  },
  {
    number: '06',
    title: 'Commercial & Infrastructure',
    text: 'Protective barriers and fencing for commercial and public spaces.',
    image: siteImages.commercial.src,
    alt: siteImages.commercial.alt,
    products: ['welded-wire-mesh', 'chain-link-wire-mesh', 'aluminium-wire-mesh', 'stainless-steel-wire-mesh'],
  },
]
