const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function scrapeRates() {
    console.log('Starting scraper...');
    const browser = await puppeteer.launch({
        headless: "new",
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();

    // Set a realistic user agent to avoid basic blocks
    await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

    try {
        console.log('Navigating to Revolut Savings page...');
        await page.goto('https://www.revolut.com/pl-PL/savings/', { waitUntil: 'networkidle2', timeout: 60000 });

        // Default fallback rates (from manual research)
        let rates = {
            Standard: 2.75,
            Plus: 2.75,
            Premium: 3.25,
            Metal: 3.75,
            Ultra: 4.00
        };

        console.log('Extracting text content for analysis...');
        const bodyText = await page.evaluate(() => document.body.innerText);

        // Simple regex heuristics to find rates
        // Look for patterns like "Ultra 5%" or "do 4% rocznie"
        // This is "best effort" scraping as the DOM structure changes frequently

        const ultraMatch = bodyText.match(/Ultra.*?(\d+[.,]\d+)%/i) || bodyText.match(/(\d+[.,]\d+)%.*?Ultra/i);
        if (ultraMatch) {
            const rate = parseFloat(ultraMatch[1].replace(',', '.'));
            if (!isNaN(rate) && rate > 0 && rate < 10) {
                rates.Ultra = rate;
                console.log(`Detected Ultra rate: ${rate}%`);
            }
        }

        const premiumMatch = bodyText.match(/Premium.*?(\d+[.,]\d+)%/i);
        if (premiumMatch) {
            const rate = parseFloat(premiumMatch[1].replace(',', '.'));
            if (!isNaN(rate)) {
                rates.Premium = rate;
                console.log(`Detected Premium rate: ${rate}%`);
            }
        }

        // Save to file
        const output = {
            updatedAt: new Date().toISOString(),
            rates: rates
        };

        const outputPath = path.join(__dirname, '..', 'rates.json');
        fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));
        console.log(`Rates saved to ${outputPath}`);

    } catch (error) {
        console.error('Scraping failed:', error);
        process.exit(1);
    } finally {
        await browser.close();
    }
}

scrapeRates();
