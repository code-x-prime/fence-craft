/**
 * Every photograph on the site lives here: one place to swap an image, its
 * alt text or its crop. Components and data files import from `siteImages`
 * and never hard-code a path.
 *
 * Rule: one section = one image. Photos are real stock photography (no AI
 * renders); replace any of them with FENCECRAFT's own product photos by
 * dropping a file into /public/images/final and editing the path below.
 */
export type SiteImage = {
  src: string
  alt: string
  /** Tailwind object-position class, used where the subject needs framing. */
  position?: string
}

const img = (file: string, alt: string, position?: string): SiteImage => ({
  src: `/images/final/${file}`,
  alt,
  position,
})

export const siteImages = {
  // ---- primary section images -------------------------------------------
  hero: img('hero.jpg', 'Close-up of welded steel wire mesh, dark and sharp, with a fine square grid', 'object-[60%_50%]'),
  about: img('about.jpg', 'Stacked galvanized welded wire mesh panels in a warehouse'),
  galvanized: img('galvanized.jpg', 'Rolls of galvanized diamond wire mesh, stacked side by side'),
  stainlessSteel: img('stainless.jpg', 'Close-up of stainless steel welded wire mesh with a regular square grid'),
  aluminium: img('aluminium.jpg', 'Close-up of aluminium wire mesh with a fine hexagonal pattern'),
  pvc: img('pvc.jpg', 'Green PVC coated welded mesh garden fence with plants behind it'),
  industrial: img('industrial.jpg', 'Welded wire mesh security fence with cameras around an industrial site'),
  security: img('security.jpg', 'Razor barbed wire coils along the top of a fence against a blue sky'),
  construction: img('construction.jpg', 'Temporary wire mesh fence panels enclosing a construction site'),
  agricultural: img('agricultural.jpg', 'Cow looking through a barbed wire farm fence in a field', 'object-[50%_45%]'),
  residential: img('residential.jpg', 'Galvanized chain link fencing in close-up against a soft sky'),
  commercial: img('commercial.jpg', 'Grey welded mesh fence panels beside a commercial building'),

  // ---- inner-page heroes ------------------------------------------------
  aboutHero: img('about-hero.jpg', 'Rolls of galvanized steel, chicken wire and plastic mesh in a stock room'),
  productsHero: img('products-hero.jpg', 'Rolls of welded wire mesh lined up in a row, shot at low angle'),
  solutionsHero: img('solutions-hero.jpg', 'Long high-security wire mesh fence with floodlights under a blue sky'),
  contactHero: img('contact-hero.jpg', 'Razor barbed wire against a deep blue sky'),
  notFound: img('diamond-mesh.jpg', 'Blue-lit diamond pattern expanded metal mesh in close-up'),

  // ---- product images (one primary image per product) --------------------
  concertina: img('concertina.jpg', 'Coils of concertina razor wire lying in grass'),
  rbt: img('security.jpg', 'Razor barbed tape coiled along the top of a fence against a blue sky'),
  chainLink: img('chain-link.jpg', 'Galvanized chain link fencing in close-up against a soft sky'),
  barbedWire: img('barbed-wire.jpg', 'Barbed wire strung along a fence line in warm evening light'),
  mosquitoWireMesh: img('mosquito-mesh.jpg', 'Fine dark wire mesh in close-up'),
  weldedMesh: img('about.jpg', 'Stacked galvanized welded wire mesh panels in a warehouse'),
  hexagonal: img('hexagonal.jpg', 'Cattle standing inside a farm enclosure fenced with wire mesh'),
  stainlessMosquito: img('stainless-mosquito.jpg', 'Fine welded wire mesh with an even square grid, in close-up'),
  diamondBarfi: img('diamond-mesh.jpg', 'Blue-lit diamond pattern expanded metal mesh in close-up'),
  pvcWire: img('pvc-panel.jpg', 'Green PVC coated wire mesh fence panels along a garden path'),
  mosquitoNet: img('mosquito-net.jpg', 'Fitting fine mosquito screen mesh into a frame with hand tools'),
  shadeNet: img('shade-net.jpg', 'Polytunnel greenhouse and planted rows in an open agricultural field'),
  birdNet: img('bird-net.jpg', 'White protective netting stretched over rows of trees in an orchard'),
} as const
