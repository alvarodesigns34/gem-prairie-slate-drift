import { chromium } from 'playwright';
const browser = await chromium.launch({
  headless: true,
  executablePath: '/opt/pw-browsers/chromium_headless_shell-1234/chrome-headless-shell-linux64/chrome-headless-shell',
  args: ['--no-sandbox', '--disable-gpu', '--use-gl=angle', '--use-angle=swiftshader'],
});
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const errors = [];
page.on('pageerror', (e) => errors.push(String(e)));
page.on('console', (m) => {
  if (m.type() === 'error') errors.push('console:' + m.text());
});
await page.goto('http://127.0.0.1:8080/', { waitUntil: 'networkidle', timeout: 30000 });
await page.waitForTimeout(2500);
await page.screenshot({ path: '/workspace/tmp-ss/01-load.png' });
const body = await page.locator('body').innerText();
const hasCrash = body.includes('Rendered more hooks') || body.includes('Something went wrong');
console.log('CRASH_ON_LOAD', hasCrash);
console.log('HAS_STACK', body.includes('SUPER HEAVY'));
console.log('HAS_H', body.includes('124.1'));

const nose = page.getByRole('button', { name: 'Nose Cone' });
if (await nose.count()) {
  await nose.click();
  await page.waitForTimeout(800);
  await page.screenshot({ path: '/workspace/tmp-ss/02-select.png' });
  const body2 = await page.locator('body').innerText();
  console.log('CRASH_ON_SELECT', body2.includes('Rendered more hooks') || body2.includes('Something went wrong'));
  console.log('SELECTED', body2.includes('Ogive nose') || body2.includes('304L'));
}

const explode = page.getByTitle('Exploded view');
if (await explode.count()) {
  await explode.click();
  await page.waitForTimeout(1500);
  await page.screenshot({ path: '/workspace/tmp-ss/03-explode.png' });
  const body3 = await page.locator('body').innerText();
  console.log('CRASH_ON_EXPLODE', body3.includes('Rendered more hooks') || body3.includes('Something went wrong'));
}

console.log('ERRORS');
for (const e of errors.slice(0, 15)) console.log(' -', e);
await browser.close();
