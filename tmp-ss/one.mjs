import { chromium } from 'playwright';
const browser = await chromium.launch({
  headless: true,
  executablePath: '/opt/pw-browsers/chromium_headless_shell-1234/chrome-headless-shell-linux64/chrome-headless-shell',
  args: ['--no-sandbox','--disable-gpu','--use-gl=angle','--use-angle=swiftshader'],
});
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const errors = [];
page.on('pageerror', (e) => errors.push(String(e)));
await page.goto('http://127.0.0.1:8080/', { waitUntil: 'domcontentloaded', timeout: 20000 });
await page.waitForTimeout(3500);
await page.screenshot({ path: '/workspace/tmp-ss/07-final.png' });
const body = await page.locator('body').innerText();
console.log('CRASH', body.includes('Rendered more hooks') || body.includes('Something went wrong'));
console.log('STACK', body.includes('SUPER HEAVY'), body.includes('124.1'));
console.log('ERR', errors.slice(0,6));
await browser.close();
