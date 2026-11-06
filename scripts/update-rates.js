const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const fs = require('fs');
const path = require('path');

// Activate Puppeteer stealth plugin
puppeteer.use(StealthPlugin());

const RATES_PATH = path.join(__dirname, '..', 'rates.json');
const TARGET_URL = 'https://www.revolut.com/pl-PL/our-pricing-plans/';

function loadExistingRates() {
    try {
        if (fs.existsSync(RATES_PATH)) {
            return JSON.parse(fs.readFileSync(RATES_PATH, 'utf8'));
        }
    } catch (err) {
        console.warn('Could not read existing rates.json:', err.message);
    }
    return null;
}

function haveRatesChanged(existingRates, newRates) {
    if (!existingRates) return true;
    const plans = ['Standard', 'Plus', 'Premium', 'Metal', 'Ultra'];
    return plans.some(plan => {
        const oldVal = Number(existingRates[plan]);
        const newVal = Number(newRates[plan]);
        return isNaN(oldVal) || Math.abs(oldVal - newVal) > 0.001;
    });
}

function validateRates(rates) {
    const plans = ['Standard', 'Plus', 'Premium', 'Metal', 'Ultra'];
    for (const plan of plans) {
        const val = rates[plan];
        if (typeof val !== 'number' || isNaN(val) || val < 0.5 || val > 15.0) {
            throw new Error(`Invalid rate extracted for plan ${plan}: ${val}`);
        }
    }
    if (rates.Ultra < rates.Standard) {
        throw new Error(`Sanity check failed: Ultra rate (${rates.Ultra}) < Standard rate (${rates.Standard})`);
    }
}

async function scrapeRates() {
    console.log('Starting stealth Revolut savings rates scraper...');

    let launchOptions = {
        headless: "new",
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-blink-features=AutomationControlled',
            '--window-size=1920,1080',
            '--lang=pl-PL,pl'
        ]
    };

    if (process.platform === 'darwin') {
        const possiblePaths = [
            '/Users/michaljablonski/Library/Caches/ms-playwright/chromium-1228/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing',
            '/Users/michaljablonski/Library/Caches/ms-playwright/chromium-1223/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing',
            '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
            '/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary'
        ];
        for (const p of possiblePaths) {
            if (fs.existsSync(p)) {
                launchOptions.executablePath = p;
                console.log(`Using Chrome executable at: ${p}`);
                break;
            }
        }
    }

    let browser = null;
    try {
        browser = await puppeteer.launch(launchOptions);
        const page = await browser.newPage();

        await page.setViewport({ width: 1920, height: 1080 });
        await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36');

        await page.setExtraHTTPHeaders({
            'Accept-Language': 'pl-PL,pl;q=0.9,en-US;q=0.8,en;q=0.7',
            'sec-ch-ua': '"Chromium";v="130", "Google Chrome";v="130", "Not?A_Brand";v="99"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"macOS"'
        });
        console.log(`Navigating to ${TARGET_URL}...`);
        const response = await page.goto(TARGET_URL, {
            waitUntil: 'networkidle2',
            timeout: 60000
        });

        const status = response ? response.status() : null;
        const pageTitle = await page.title();
        console.log(`Page HTTP status: ${status}, Title: "${pageTitle}"`);

        // Check if blocked by Cloudflare challenge
        const isChallenge = pageTitle.toLowerCase().includes('just a moment') ||
                            pageTitle.toLowerCase().includes('attention required') ||
                            pageTitle.toLowerCase().includes('cloudflare') ||
                            await page.$('#challenge-running, #challenge-stage, .cf-turnstile, #cf-turnstile');

        if (isChallenge) {
            console.warn('⚠️ Cloudflare security challenge detected. Waiting up to 10s for stealth self-resolution...');
            try {
                await page.waitForNavigation({ timeout: 10000, waitUntil: 'networkidle2' });
            } catch (_) {}
        }

        console.log('Attempting DOM extraction of savings rates...');
        const parsedRates = await page.evaluate(() => {
            const allElements = Array.from(document.querySelectorAll('*'));

            const candidateLabels = [
                'Sejfy na oszczędności (PLN)',
                'Sejfy na oszczędności',
                'Konta oszczędnościowe (PLN)',
                'Konto oszczędnościowe (PLN)'
            ];

            let labelEl = null;
            for (const label of candidateLabels) {
                labelEl = allElements.find(el =>
                    el.textContent &&
                    el.textContent.trim().includes(label) &&
                    el.children.length === 0
                );
                if (labelEl) break;
            }

            if (!labelEl) return null;

            let rowEl = labelEl.parentElement;
            while (rowEl && rowEl.tagName !== 'BODY') {
                const siblings = rowEl.parentElement
                    ? Array.from(rowEl.parentElement.children)
                    : [];

                const siblingTexts = siblings.map(s => (s.innerText || '').trim());
                const allText = siblingTexts.join('\n');

                const matches = [...allText.matchAll(/(\d+(?:[.,]\d+)?)%/g)]
                    .map(m => parseFloat(m[1].replace(',', '.')))
                    .filter(r => !isNaN(r) && r >= 0.5 && r <= 15.0);

                if (matches.length >= 5) {
                    return matches.slice(0, 5);
                }

                rowEl = rowEl.parentElement;
            }

            return null;
        });

        const existingData = loadExistingRates();
        const existingRates = existingData?.rates || null;

        if (parsedRates && parsedRates.length >= 5) {
            const extractedRates = {
                Standard: parsedRates[0],
                Plus:     parsedRates[1],
                Premium:  parsedRates[2],
                Metal:    parsedRates[3],
                Ultra:    parsedRates[4]
            };

            validateRates(extractedRates);
            console.log('✅ Successfully extracted and validated 5 live rates from Revolut:', extractedRates);

            if (haveRatesChanged(existingRates, extractedRates)) {
                const output = {
                    updatedAt: new Date().toISOString(),
                    rates: extractedRates
                };
                fs.writeFileSync(RATES_PATH, JSON.stringify(output, null, 2) + '\n');
                console.log(`🚀 Rates have changed! Updated ${RATES_PATH}`);
            } else {
                console.log('ℹ️ Rates are unchanged. Preserving rates.json (skipping write to prevent empty commits).');
            }
        } else {
            console.warn('⚠️ Could not extract live rates (page blocked by Cloudflare or DOM structure changed).');
            console.warn('🔒 PRESERVING existing rates.json without modification.');
            if (existingRates) {
                console.log('Current stored rates remain active:', existingRates);
            }
        }

    } catch (error) {
        console.error('Scraping encountered an error:', error.message || error);
    } finally {
        if (browser) {
            await browser.close();
        }
    }
}

scrapeRates();
