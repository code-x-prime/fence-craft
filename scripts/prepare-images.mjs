import { createRequire } from 'node:module'
import { readFile, mkdir, writeFile } from 'node:fs/promises'
import { readdirSync } from 'node:fs'
const require = createRequire(import.meta.url)
const sharpPackage = readdirSync('node_modules/.pnpm').find(p => p.startsWith('sharp@'))
const sharp = require(`../node_modules/.pnpm/${sharpPackage}/node_modules/sharp`)
const manifest = JSON.parse(await readFile('docs/image-generation.json', 'utf8'))
await mkdir('public/images/generated', { recursive: true })
await mkdir('artifacts/review', { recursive: true })
const tiles = []
let total = 0
for (const [index, asset] of manifest.assets.entries()) {
  const target = `public/images/generated/${asset.name}.webp`
  const info = await sharp(asset.source).resize({ width: 1536, withoutEnlargement: true }).webp({ quality: 85 }).toFile(target)
  total += info.size
  tiles.push({ input: await sharp(asset.source).resize(240, 160, { fit: 'cover' }).toBuffer(), left: (index % 4) * 240, top: Math.floor(index / 4) * 192 })
  const label = `<svg width="240" height="32"><rect width="240" height="32" fill="#16232b"/><text x="10" y="21" fill="white" font-size="14" font-family="Arial">${asset.name}</text></svg>`
  tiles.push({ input: Buffer.from(label), left: (index % 4) * 240, top: Math.floor(index / 4) * 192 + 160 })
}
await sharp({ create: { width: 960, height: Math.ceil(manifest.assets.length / 4) * 192, channels: 3, background: '#16232b' } }).composite(tiles).png().toFile('artifacts/review/generated-contact-sheet.png')
console.log(JSON.stringify({ assets: manifest.assets.length, totalBytes: total }))
