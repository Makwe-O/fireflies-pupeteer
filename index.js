const { chromium, devices } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://google.com', { waitUntil: 'networkidle' });
  // Type our query into the search bar
  await page.fill('.gLFyf.gsfi', 'fireflies note taking');

  await page.keyboard.press('Enter');

  //  Extract the results from the page
  const links = await page.evaluate(() => {
    const anchors = Array.from(document.querySelectorAll('h3'));
    return anchors.map((anchor) => anchor.textContent);
  });
  console.log(links.join('\n'));
  browser.close();
})();
