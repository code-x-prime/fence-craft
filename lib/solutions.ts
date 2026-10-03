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
    text: 'Define the boundary around factories, warehouses and service yards while keeping sightlines open. Chain link and welded mesh suit long runs, with security wire available for added perimeter deterrence.',
    image: siteImages.industrial.src,
    alt: siteImages.industrial.alt,
    products: ['chain-link-wire-mesh', 'welded-wire-mesh', 'barbed-wire'],
  },
  {
    number: '02',
    title: 'Security Fencing',
    text: 'Add a physical deterrent to boundary walls and existing fences with barbed wire, concertina coils or razor barbed tape. Choose the barrier around the site layout and its access requirements.',
    image: siteImages.security.src,
    alt: siteImages.security.alt,
    products: ['concertina-coil', 'rbt-razor-barbed-tape', 'barbed-wire'],
  },
  {
    number: '03',
    title: 'Construction',
    text: 'Separate working areas, mark site boundaries and manage access during construction. Mesh panels, chain link and shade netting support different enclosure and screening requirements.',
    image: siteImages.construction.src,
    alt: siteImages.construction.alt,
    products: ['welded-wire-mesh', 'chain-link-wire-mesh', 'shade-net'],
  },
  {
    number: '04',
    title: 'Agricultural & Farm',
    text: 'Create practical farm boundaries and poultry enclosures, or protect growing areas with bird and shade netting. Match the mesh opening and material to the animals, crops and area involved.',
    image: siteImages.agricultural.src,
    alt: siteImages.agricultural.alt,
    products: ['hexagonal-chicken-wire-mesh', 'barbed-wire', 'bird-net', 'shade-net'],
  },
  {
    number: '05',
    title: 'Residential / General',
    text: 'Shape garden boundaries, protect planted areas and screen windows without closing off airflow. Explore coated garden mesh, welded mesh and fine insect screening for everyday use.',
    image: siteImages.residential.src,
    alt: siteImages.residential.alt,
    products: ['pvc-garden-mesh', 'welded-wire-mesh', 'mosquito-wire-mesh'],
  },
  {
    number: '06',
    title: 'Commercial & Infrastructure',
    text: 'Define access around offices, commercial grounds and shared spaces with mesh fencing and screening. Select from galvanized, stainless steel and aluminium products to suit the application.',
    image: siteImages.commercial.src,
    alt: siteImages.commercial.alt,
    products: ['welded-wire-mesh', 'chain-link-wire-mesh', 'aluminium-wire-mesh', 'stainless-steel-wire-mesh'],
  },
]
