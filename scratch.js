const puppeteer = require('puppeteer');

async function test() {
    const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
    await page.goto('https://www.revolut.com/pl-PL/our-pricing-plans/', { waitUntil: 'networkidle2', timeout: 60000 });
    
    const bodyText = await page.evaluate(() => document.body.innerText);
    console.log(bodyText.substring(0, 1000));
    
    const oszczednosciIndex = bodyText.indexOf('Sejfy na oszczędności (PLN)');
    if (oszczednosciIndex !== -1) {
        console.log("\nFOUND IT:");
        console.log(bodyText.substring(oszczednosciIndex - 50, oszczednosciIndex + 500));
    } else {
        console.log("NOT FOUND in innerText");
    }
    
    await browser.close();
}
test();
