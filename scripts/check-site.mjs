import { chromium } from '@playwright/test'
import { readFile, mkdir, writeFile } from 'node:fs/promises'

const baseURL = process.env.CHECK_URL || 'http://localhost:3000'
const slugs = [...(await readFile('lib/products.ts', 'utf8')).matchAll(/slug: '([^']+)'/g)].map(m => m[1])
const routes = ['/', '/about', '/products', '/solutions', '/contact', ...slugs.map(s => `/products/${s}`), '/missing-page']
const browser = await chromium.launch({ channel: 'chrome', headless: true })
await mkdir('artifacts/review', { recursive: true })
const results = []
try {
  for (const width of [320, 390, 768, 1440]) {
    const context = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: 'reduce' })
    const page = await context.newPage()
    for (const route of routes) {
      const errors = []
      const onError = error => errors.push(error.message)
      page.on('pageerror', onError)
      const response = await page.goto(baseURL + route, { waitUntil: 'networkidle' })
      await page.evaluate(() => document.fonts.ready)
      for (const section of await page.locator('main section').all()) {
        await section.scrollIntoViewIfNeeded()
        await page.waitForTimeout(80)
      }
      for (const img of await page.locator('main img').all()) {
        await img.scrollIntoViewIfNeeded()
        await img.evaluate(el => el.decode().catch(() => {}))
      }
      const audit = await page.evaluate(() => ({
        overflow: document.documentElement.scrollWidth > innerWidth + 1,
        broken: [...document.querySelectorAll('img')].filter(i => !i.complete || i.naturalWidth === 0).map(i => i.getAttribute('src')),
        h1: document.querySelectorAll('main h1').length,
        font: getComputedStyle(document.body).fontFamily,
        overflowingSections: [...document.querySelectorAll('main section h1, main section h2, main section h3, main section p, main section .btn')].filter(s => { const r = s.getBoundingClientRect(); return r.left < -2 || r.right > innerWidth + 2 }).map(s => s.textContent.trim().slice(0, 70)),
      }))
      results.push({ route, width, status: response.status(), errors, ...audit })
      if ([390, 1440].includes(width) && ['/', '/about', '/products', '/solutions', '/contact'].includes(route)) {
        await page.evaluate(() => window.scrollTo(0, 0))
        await page.waitForTimeout(150)
        await page.screenshot({ path: `artifacts/review/${route.slice(1) || 'home'}-${width}.png`, fullPage: true })
      }
      page.off('pageerror', onError)
      console.log(JSON.stringify({ route, width, status: response.status(), errors, overflow: audit.overflow, broken: audit.broken.length, overflowingSections: audit.overflowingSections }))
    }
    if (width === 390) {
      await page.goto(baseURL)
      await page.getByRole('button', { name: 'Open menu' }).click()
      await page.getByRole('navigation', { name: 'Mobile', exact: true }).getByRole('link', { name: /About/ }).click()
      await page.waitForURL('**/about')
      if (await page.getByRole('button', { name: 'Open menu' }).count() !== 1) throw new Error('Mobile navigation failed to close')
    }
    await context.close()
  }
  const context = await browser.newContext({ javaScriptEnabled: false })
  const page = await context.newPage()
  await page.goto(baseURL)
  const visible = await page.locator('main h1').isVisible()
  results.push({ javascriptDisabled: true, headingVisible: visible })
  await context.close()
  await writeFile('artifacts/review/results.json', JSON.stringify(results, null, 2))
  const failed = results.filter(r => r.overflow || r.broken?.length || r.errors?.length || r.overflowingSections?.length || r.h1 === 0 || r.headingVisible === false || (r.status >= 400 && r.route !== '/missing-page'))
  console.log(JSON.stringify({ checked: results.length, failures: failed }, null, 2))
  if (failed.length) process.exitCode = 1
} finally {
  await browser.close()
}
