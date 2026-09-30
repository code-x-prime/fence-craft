export const site = {
  name: 'FENCECRAFT',
  tagline: 'ENGINEERED TO PROTECT',
  established: 2016,
  parent: 'S.B. ENTERPRISES',
  addressLines: ['C-182, Sec-2,', 'Bawana Industrial Area,', 'Delhi-110039'],
  phone: '9811812122',
  phoneHref: 'tel:+919811812122',
  whatsapp: '7011087500',
  whatsappHref: 'https://wa.me/917011087500',
  email: 'info@fencecraft.in',
  emailHref: 'mailto:info@fencecraft.in',
  mapsHref: 'https://maps.app.goo.gl/hhiqF9hHkAVc8ogUA?g_st=aw',
} as const

export const nav = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Products', href: '/products' },
  { label: 'Solutions', href: '/solutions' },
  { label: 'Contact', href: '/contact' },
] as const

export const aboutSteps = [
  {
    n: '01',
    title: 'Wire Mesh',
    text: 'Welded, hexagonal, chain link and PVC-coated mesh: the base material behind almost every fencing requirement.',
  },
  {
    n: '02',
    title: 'Security Fencing',
    text: 'Barbed wire, concertina coil and razor barbed tape for boundaries that need to keep people out.',
  },
  {
    n: '03',
    title: 'Industrial Applications',
    text: 'Perimeters, enclosures and commercial sites, with the product chosen to suit the application.',
  },
  {
    n: '04',
    title: 'Complete Fencing Solutions',
    text: 'One brand across the full range, with supply and service built around what each project needs.',
  },
]

