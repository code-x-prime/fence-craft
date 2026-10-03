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
      'Versatile steel mesh and security wire for boundaries, site enclosures and farm fencing. Explore chain link, welded and hexagonal patterns alongside barbed wire and razor products.',
    image: siteImages.galvanized.src,
    alt: siteImages.galvanized.alt,
  },
  {
    slug: 'stainless-steel',
    number: '02',
    code: 'S.S.',
    name: 'Stainless Steel',
    footerLabel: 'S.S. Wire Mesh',
    description: 'Stainless steel mesh for screens, guards and fabrication, including fine insect screening. Discuss grades 201, 202 and 304 with our team to suit your application.',
    image: siteImages.stainlessSteel.src,
    alt: siteImages.stainlessSteel.alt,
  },
  {
    slug: 'aluminium',
    number: '03',
    code: 'AL',
    name: 'Aluminium',
    footerLabel: 'Aluminium Mesh',
    description: 'Lightweight mesh for window screens, ventilation panels and decorative grilles. Choose woven wire or a diamond pattern around the opening and finish you need.',
    image: siteImages.aluminium.src,
    alt: siteImages.aluminium.alt,
  },
  {
    slug: 'pvc-plastic-mesh',
    number: '04',
    code: 'PVC',
    name: 'PVC Coated / Plastic Mesh',
    footerLabel: 'PVC / Plastic Mesh',
    description: 'Green coated wire mesh and practical protective netting for gardens, balconies and growing areas. Find garden mesh, insect screens, shade net and bird net in one range.',
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
      'An expanding coil of razor wire designed to add a visible physical deterrent along perimeter fences and boundary walls. Discuss coil size, quantity and mounting requirements for your site.',
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
      'Stamped metal tape with sharp blades, used as an additional perimeter barrier. Suitable configurations depend on your fence or wall layout; contact us to discuss the required profile and quantity.',
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
      'Interwoven steel wire creates a flexible diamond pattern for open, visible boundaries. A practical option for factory yards, sports spaces and farm enclosures, with specifications confirmed on enquiry.',
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
    description: 'Twisted wire strands with regularly spaced barbs for agricultural boundaries and perimeter deterrence. Discuss the wire specification, run length and number of strands your boundary needs.',
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
    description: 'Fine galvanized woven mesh for doors, windows and ventilation openings. Its small apertures provide insect screening while preserving airflow; choose specifications around your frame and application.',
    image: siteImages.mosquitoWireMesh.src,
    alt: siteImages.mosquitoWireMesh.alt,
    applications: ['Windows and doors', 'Ventilation openings', 'Enclosures that need airflow and insect control'],
  },
  {
    slug: 'welded-wire-mesh',
    name: 'Welded Wire Mesh',
    category: 'galvanized-iron',
    description:
      'Crossing steel wires welded at each intersection form a regular square grid. Used in boundary panels, enclosures and guards, with the mesh opening and wire size selected around the application.',
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
      'Flexible wire netting woven into six-sided openings, commonly called chicken wire. Useful for poultry enclosures, garden protection and light fencing where a shaped or wrapped mesh is needed.',
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
    description: 'A welded square grid in stainless steel for partitions, guards and fabrication. Available grade options include 201, 202 and 304; our team can discuss the specification your environment requires.',
    image: siteImages.stainlessProduct.src,
    alt: siteImages.stainlessProduct.alt,
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
    description: 'Fine woven stainless steel screening for window, door and ventilation frames. Compare grades 201, 202 and 304, and confirm the aperture and wire specification before ordering.',
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
    description: 'Lightweight woven aluminium mesh for window screens, ventilation and light enclosures. A useful choice when handling weight matters; contact us for mesh openings, roll sizes and availability.',
    image: siteImages.aluminiumProduct.src,
    alt: siteImages.aluminiumProduct.alt,
    applications: ['General fencing and screening', 'Windows and ventilation', 'Lightweight enclosures'],
  },
  {
    slug: 'diamond-barfi-wire-mesh',
    name: 'Diamond / Barfi Wire Mesh',
    category: 'aluminium',
    description: 'Aluminium mesh with repeating diamond-shaped openings, also known as barfi mesh. Used in grilles, ventilation panels and decorative screens where an open geometric pattern is required.',
    image: siteImages.diamondBarfi.src,
    alt: siteImages.diamondBarfi.alt,
    applications: ['Screens and grilles', 'Ventilation panels', 'Light enclosures'],
  },
  // ---- PVC / plastic ------------------------------------------------------
  {
    slug: 'pvc-garden-mesh',
    name: 'PVC Hexa / Garden Mesh',
    category: 'pvc-plastic-mesh',
    description: 'Hexagonal wire mesh with a green PVC coating for garden boundaries, plant protection and light animal enclosures. Its flexible pattern works around posts, beds and shaped garden areas.',
    image: siteImages.pvcGarden.src,
    alt: siteImages.pvcGarden.alt,
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
    description: 'Wire mesh with a PVC outer coating for garden fences, parks and general enclosures. Discuss the required mesh pattern, opening and wire size to match the boundary you are planning.',
    image: siteImages.pvcWire.src,
    alt: siteImages.pvcWire.alt,
    applications: ['Fencing and enclosures', 'Garden and park boundaries', 'General outdoor applications'],
  },
  {
    slug: 'mosquito-net',
    name: 'Mosquito Net',
    category: 'pvc-plastic-mesh',
    description: 'Fine lightweight netting for insect screening in doors, windows and ventilation frames. Share your frame dimensions and installation requirement to confirm the suitable net specification.',
    image: siteImages.mosquitoNet.src,
    alt: siteImages.mosquitoNet.alt,
    applications: ['Windows and doors', 'Ventilation openings', 'Frames and enclosures'],
  },
  {
    slug: 'shade-net',
    name: 'Shade Net / Green Net',
    category: 'pvc-plastic-mesh',
    description: 'Woven shade netting for nurseries, garden structures and outdoor screening. Select the shade requirement and coverage area around your plants or space; specifications are available on enquiry.',
    image: siteImages.shadeNet.src,
    alt: siteImages.shadeNet.alt,
    applications: ['Agriculture and nurseries', 'Gardens and outdoor areas', 'Site screening and shading'],
  },
  {
    slug: 'bird-net',
    name: 'Bird Net',
    category: 'pvc-plastic-mesh',
    description: 'Lightweight protective netting for balconies, terraces, orchards and growing areas. Define the area and opening size you need to cover, then confirm the net and installation requirements with our team.',
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

/** Greedy word-wrap of a name into display lines for headings. */
export function titleLines(name: string, maxChars = 15): string[] {
  const lines: string[] = []
  let cur = ''
  for (const w of name.split(' ')) {
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
