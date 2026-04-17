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
        console.log('Navigating to Revolut Pricing Plans page...');
        await page.goto('https://www.revolut.com/pl-PL/our-pricing-plans/', { waitUntil: 'networkidle2', timeout: 60000 });

        // Default fallback rates
        let rates = {
            Standard: 2.75,
            Plus: 2.75,
            Premium: 3.25,
            Metal: 3.50,
            Ultra: 3.90
        };

        console.log('Extracting savings rates using DOM traversal...');
        const parsedRates = await page.evaluate(() => {
            const allElements = Array.from(document.querySelectorAll('*'));

            // Find the deepest leaf element containing the label text
            const labelEl = allElements.find(el =>
                el.textContent &&
                el.textContent.trim().includes('Sejfy na oszczędności (PLN)') &&
                el.children.length === 0
            );

            if (!labelEl) {
                console.log('Label element not found');
                return null;
            }

            // Walk up to find the row container for THIS specific feature row
            // We stop at the smallest ancestor that is a direct child of the grid/table container
            // The row sibling cells should be at the same depth as the label cell
            let rowEl = labelEl.parentElement;
            while (rowEl && rowEl.tagName !== 'BODY') {
                // The row container should have siblings that contain the % cells
                const siblings = rowEl.parentElement
                    ? Array.from(rowEl.parentElement.children)
                    : [];

                // Collect text from group of siblings (the row group)
                const siblingTexts = siblings.map(s => (s.innerText || '').trim());
                const allText = siblingTexts.join('\n');

                // Extract only valid interest rate percentages (between 1% and 15%)
                // Single pattern handles both "2,75%" and "4%" — range filter excludes junk
                const matches = [...allText.matchAll(/(\d+(?:[.,]\d+)?)%/g)]
                    .map(m => parseFloat(m[1].replace(',', '.')))
                    .filter(r => !isNaN(r) && r >= 1 && r <= 15);

                if (matches.length >= 5) {
                    return matches.slice(0, 5);
                }

                rowEl = rowEl.parentElement;
            }

            return null;
        });

        if (parsedRates && parsedRates.length >= 5) {
            rates.Standard = parsedRates[0];
            rates.Plus     = parsedRates[1];
            rates.Premium  = parsedRates[2];
            rates.Metal    = parsedRates[3];
            rates.Ultra    = parsedRates[4];
            console.log('Successfully extracted all 5 rates:', rates);
        } else {
            console.warn('Could not reliably extract 5 rates. Using defaults. Parsed:', parsedRates);
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
