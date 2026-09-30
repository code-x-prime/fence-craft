/**
 * Single source of truth for the catalogue. Listing, category and detail pages,
 * related products, the footer and the homepage all read from here.
 *
 * Only information supplied by the company is stated (categories, product
 * names, stainless grades 201/202/304). Descriptions and applications are
 * general, practical descriptions — no dimensions, strengths, coatings,
 * certifications or warranties are claimed.
 */

import { siteImages } from '@/lib/site-images'

export type Category = {
  slug: string
  number: string
  code: string
  name: string
  footerLabel: string
  description: string
  image: string
  alt: string
}

export type Product = {
  slug: string
  name: string
  category: Category['slug']
  description: string
  image: string
  alt: string
  applications: string[]
  /** Only where supplied by the company, e.g. stainless grades. */
  note?: string
}

export const categories: Category[] = [
  {
    slug: 'galvanized-iron',
    number: '01',
    code: 'G.I.',
    name: 'Galvanized Iron',
    footerLabel: 'G.I. Wire Mesh',
    description:
      'The core of the range: wire products for perimeters, security barriers, enclosures and everyday fencing.',
    image: siteImages.galvanized.src,
    alt: siteImages.galvanized.alt,
  },
  {
    slug: 'stainless-steel',
    number: '02',
    code: 'S.S.',
    name: 'Stainless Steel',
    footerLabel: 'S.S. Wire Mesh',
    description: 'Stainless mesh for applications that need a cleaner, more durable material.',
    image: siteImages.stainlessSteel.src,
    alt: siteImages.stainlessSteel.alt,
  },
  {
    slug: 'aluminium',
    number: '03',
    code: 'AL',
    name: 'Aluminium',
    footerLabel: 'Aluminium Mesh',
    description: 'Lightweight aluminium mesh for general fencing, screening and decorative applications.',
    image: siteImages.aluminium.src,
    alt: siteImages.aluminium.alt,
  },
  {
    slug: 'pvc-plastic-mesh',
    number: '04',
    code: 'PVC',
    name: 'PVC Coated / Plastic Mesh',
    footerLabel: 'PVC / Plastic Mesh',
    description: 'Coated and plastic meshes and nets for gardens, enclosures and general protection.',
    image: siteImages.pvc.src,
    alt: siteImages.pvc.alt,
  },
]

export const products: Product[] = [
  // ---- G.I. ---------------------------------------------------------------
  {
    slug: 'concertina-coil',
    name: 'Concertina Coil / Wire',
    category: 'galvanized-iron',
    description:
      'Concertina coil, also called razor wire, is a coiled barrier wire that adds a strong deterrent to the top or edge of a boundary.',
    image: siteImages.concertina.src,
    alt: siteImages.concertina.alt,
    applications: [
      'Perimeter walls and fences',
      'Industrial and commercial premises',
      'Restricted-access areas',
      'Extra security over existing fencing',
    ],
  },
  {
    slug: 'rbt-razor-barbed-tape',
    name: 'RBT — Razor Barbed Tape',
    category: 'galvanized-iron',
    description:
      'Razor barbed tape (RBT) is a bladed security tape fixed along boundaries where a strong physical barrier is needed.',
    image: siteImages.rbt.src,
    alt: siteImages.rbt.alt,
    applications: [
      'Boundary walls and fences',
      'Industrial and commercial sites',
      'Restricted or sensitive areas',
      'Gates and access points',
    ],
  },
  {
    slug: 'chain-link-wire-mesh',
    name: 'Chain Link Wire Mesh',
    category: 'galvanized-iron',
    description:
      'Woven diamond-pattern mesh, one of the most common choices for boundary and enclosure fencing.',
    image: siteImages.chainLink.src,
    alt: siteImages.chainLink.alt,
    applications: [
      'Boundary and perimeter fencing',
      'Industrial yards and premises',
      'Sports and play areas',
      'Farm and garden enclosures',
    ],
  },
  {
    slug: 'barbed-wire',
    name: 'Barbed Wire',
    category: 'galvanized-iron',
    description: 'Twisted strand wire with barbs, used for boundary marking and basic perimeter protection.',
    image: siteImages.barbedWire.src,
    alt: siteImages.barbedWire.alt,
    applications: [
      'Farm and agricultural boundaries',
      'Perimeter fencing',
      'Extra height on existing fences',
      'Plot and site boundaries',
    ],
  },
  {
    slug: 'mosquito-wire-mesh',
    name: 'Mosquito Wire Mesh',
    category: 'galvanized-iron',
    description: 'Fine galvanized wire mesh used as insect screening where airflow needs to be kept.',
    image: siteImages.mosquitoWireMesh.src,
    alt: siteImages.mosquitoWireMesh.alt,
    applications: ['Windows and doors', 'Ventilation openings', 'Enclosures that need airflow and insect control'],
  },
  {
    slug: 'welded-wire-mesh',
    name: 'Welded Wire Mesh',
    category: 'galvanized-iron',
    description:
      'Wire mesh with joined crossing wires, forming a rigid, even grid that suits fencing panels and general use.',
    image: siteImages.weldedMesh.src,
    alt: siteImages.weldedMesh.alt,
    applications: [
      'Fencing panels and boundaries',
      'Enclosures and guards',
      'Construction and general use',
      'Industrial applications',
    ],
  },
  {
    slug: 'hexagonal-chicken-wire-mesh',
    name: 'Hexagonal / Chicken Wire Mesh',
    category: 'galvanized-iron',
    description:
      'Hexagonal wire mesh, commonly known as chicken mesh, woven in a flexible six-sided pattern.',
    image: siteImages.hexagonal.src,
    alt: siteImages.hexagonal.alt,
    applications: [
      'Poultry and animal enclosures',
      'Garden and farm fencing',
      'Plant protection',
      'General-purpose netting',
    ],
  },
  // ---- S.S. ---------------------------------------------------------------
  {
    slug: 'stainless-steel-wire-mesh',
    name: 'Stainless Steel Welded Wire Mesh',
    category: 'stainless-steel',
    description: 'Welded wire mesh in stainless steel, for applications that need a cleaner, more durable material.',
    image: siteImages.stainlessSteel.src,
    alt: siteImages.stainlessSteel.alt,
    applications: [
      'Industrial and process use',
      'Guards and partitions',
      'Applications needing a cleaner, more durable material',
      'General fabrication',
    ],
    note: 'Grades 201, 202, 304',
  },
  {
    slug: 'stainless-steel-mosquito-mesh',
    name: 'Stainless Steel Mosquito Wire Mesh',
    category: 'stainless-steel',
    description: 'Fine stainless steel mesh for durable insect screening.',
    image: siteImages.stainlessMosquito.src,
    alt: siteImages.stainlessMosquito.alt,
    applications: ['Windows and doors', 'Ventilation openings', 'Premises needing long-lasting insect screening'],
    note: 'Grades 201, 202, 304',
  },
  // ---- Aluminium ----------------------------------------------------------
  {
    slug: 'aluminium-wire-mesh',
    name: 'Aluminium Wire Mesh',
    category: 'aluminium',
    description: 'Lightweight aluminium wire mesh for general fencing and screening.',
    image: siteImages.aluminium.src,
    alt: siteImages.aluminium.alt,
    applications: ['General fencing and screening', 'Windows and ventilation', 'Lightweight enclosures'],
  },
  {
    slug: 'diamond-barfi-wire-mesh',
    name: 'Diamond / Barfi Wire Mesh',
    category: 'aluminium',
    description: 'Aluminium mesh in a diamond (barfi) pattern.',
    image: siteImages.diamondBarfi.src,
    alt: siteImages.diamondBarfi.alt,
    applications: ['Screens and grilles', 'Ventilation panels', 'Light enclosures'],
  },
  // ---- PVC / plastic ------------------------------------------------------
  {
    slug: 'pvc-garden-mesh',
    name: 'PVC Hexa / Garden Mesh',
    category: 'pvc-plastic-mesh',
    description: 'PVC-coated hexagonal mesh suited to gardens and light enclosures.',
    image: siteImages.pvc.src,
    alt: siteImages.pvc.alt,
    applications: [
      'Garden fencing',
      'Plant supports and protection',
      'Small animal and poultry enclosures',
      'Boundary marking',
    ],
  },
  {
    slug: 'pvc-wire-mesh',
    name: 'PVC Wire Mesh',
    category: 'pvc-plastic-mesh',
    description: 'PVC-coated wire mesh with a protective outer coating for outdoor use.',
    image: siteImages.pvcWire.src,
    alt: siteImages.pvcWire.alt,
    applications: ['Fencing and enclosures', 'Garden and park boundaries', 'General outdoor applications'],
  },
  {
    slug: 'mosquito-net',
    name: 'Mosquito Net',
    category: 'pvc-plastic-mesh',
    description: 'Fine netting for keeping insects out while letting air through.',
    image: siteImages.mosquitoNet.src,
    alt: siteImages.mosquitoNet.alt,
    applications: ['Windows and doors', 'Ventilation openings', 'Frames and enclosures'],
  },
  {
    slug: 'shade-net',
    name: 'Shade Net / Green Net',
    category: 'pvc-plastic-mesh',
    description: 'Net used to filter sunlight and provide shade over plants and open areas.',
    image: siteImages.shadeNet.src,
    alt: siteImages.shadeNet.alt,
    applications: ['Agriculture and nurseries', 'Gardens and outdoor areas', 'Site screening and shading'],
  },
  {
    slug: 'bird-net',
    name: 'Bird Net',
    category: 'pvc-plastic-mesh',
    description: 'Lightweight netting used to keep birds away from crops and open spaces.',
    image: siteImages.birdNet.src,
    alt: siteImages.birdNet.alt,
    applications: ['Orchards and crops', 'Terraces and balconies', 'Storage and open spaces'],
  },
]

export const getCategory = (slug: string) => categories.find((c) => c.slug === slug)
export const getProduct = (slug: string) => products.find((p) => p.slug === slug)
export const productsInCategory = (slug: string) => products.filter((p) => p.category === slug)

/** Same-category products first, then others, excluding the product itself. */
export function relatedProducts(product: Product, count = 3) {
  const same = products.filter((p) => p.category === product.category && p.slug !== product.slug)
  const others = products.filter((p) => p.category !== product.category)
  return [...same, ...others].slice(0, count)
}

/** Greedy word-wrap of a name into upper-case display lines for headings. */
export function titleLines(name: string, maxChars = 15): string[] {
  const lines: string[] = []
  let cur = ''
  for (const w of name.toUpperCase().split(' ')) {
    if (cur && (cur + ' ' + w).length > maxChars) {
      lines.push(cur)
      cur = w
    } else {
      cur = cur ? cur + ' ' + w : w
    }
  }
  if (cur) lines.push(cur)
  return lines
}
