import { chromium } from 'playwright';
const browser = await chromium.launch({
  headless: true,
  executablePath: '/opt/pw-browsers/chromium_headless_shell-1234/chrome-headless-shell-linux64/chrome-headless-shell',
  args: ['--no-sandbox', '--disable-gpu', '--use-gl=angle', '--use-angle=swiftshader'],
});
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const errors = [];
page.on('pageerror', (e) => errors.push(String(e)));
page.on('console', (m) => { if (m.type() === 'error') errors.push('console:' + m.text()); });
await page.goto('http://127.0.0.1:8080/', { waitUntil: 'domcontentloaded', timeout: 20000 });
await page.waitForTimeout(1800);
await page.screenshot({ path: '/workspace/tmp-ss/04-windward.png' });
const body = await page.locator('body').innerText();
console.log('CRASH', body.includes('Rendered more hooks') || body.includes('Something went wrong'));
await page.getByRole('button', { name: 'Nose Cone' }).click();
await page.waitForTimeout(400);
await page.screenshot({ path: '/workspace/tmp-ss/05-select.png' });
const b2 = await page.locator('body').innerText();
console.log('SELECT_CRASH', b2.includes('Rendered more hooks') || b2.includes('Something went wrong'));
console.log('SELECTED', b2.includes('304L'));
await page.getByTitle('Exploded view').click();
await page.waitForTimeout(900);
await page.screenshot({ path: '/workspace/tmp-ss/06-explode.png' });
const b3 = await page.locator('body').innerText();
console.log('EXPLODE_CRASH', b3.includes('Rendered more hooks') || b3.includes('Something went wrong'));
console.log('ERR_COUNT', errors.length);
for (const e of errors.slice(0, 8)) console.log(' -', e);
await browser.close();
