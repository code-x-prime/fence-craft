import { chromium } from '@playwright/test'
const browser = await chromium.launch({ channel: 'chrome', headless: true })
const failures = []
try {
  for (const width of [390, 1440]) {
    const context = await browser.newContext({ viewport: { width, height: 900 } })
    const page = await context.newPage()
    for (const route of ['/', '/about', '/products', '/solutions', '/contact']) {
      await page.goto('http://localhost:3001' + route, { waitUntil: 'networkidle' })
      await page.waitForTimeout(2800)
      const hero = await page.locator('main section').first().evaluate(el => ({ opacity: getComputedStyle(el.querySelector('img').parentElement).opacity, headingVisible: getComputedStyle(el.querySelector('[data-u]')).opacity }))
      for (const image of await page.locator('[data-ri]').all()) {
        await image.scrollIntoViewIfNeeded()
        await page.waitForTimeout(1500)
        const state = await image.evaluate(el => ({ opacity: Number(getComputedStyle(el).opacity), clip: getComputedStyle(el).clipPath, loaded: el.querySelector('img')?.naturalWidth > 0 }))
        if (state.opacity < .95 || !state.loaded) failures.push({ route, width, ...state })
      }
      if (Number(hero.opacity) < .95 || Number(hero.headingVisible) < .95) failures.push({ route, width, hero })
      await page.evaluate(() => window.scrollTo(0, 0))
      await page.waitForTimeout(1000)
      if (route === '/') await page.screenshot({ path: `artifacts/review/home-motion-${width}.png`, fullPage: false })
      console.log(JSON.stringify({ route, width, hero, failures: failures.length }))
    }
    await context.close()
  }
} finally { await browser.close() }
console.log(JSON.stringify({ failures }))
if (failures.length) process.exitCode = 1
