const fs = require('node:fs');
const path = require('node:path');
const { load } = require('cheerio');
const { PLANS, validateRates, validateData } = require('../rates-core');
const RATES_PATH = path.join(__dirname, '..', 'rates.json');
const TARGET_URL = 'https://www.revolut.com/pl-PL/our-pricing-plans/';

function extractRates(html) {
  const $ = load(html);
  $('script, style, noscript').remove();
  if (/just a moment|attention required|security verification/i.test($('title').text()) || $('#challenge-running, #challenge-stage').length) {
    throw new Error('Source security challenge; no bypass attempted.');
  }
  // Only the explicitly labelled PLN savings row, never arbitrary percentages elsewhere.
  const labels = new Set(['Sejfy na oszczędności (PLN)', 'Konta oszczędnościowe (PLN)', 'Konto oszczędnościowe (PLN)']);
  const candidates = [];
  $('*').each((_, el) => {
    if ($(el).children().length || !labels.has($(el).text().replace(/\s+/g, ' ').trim())) return;
    let row = $(el).parent();
    while (row.length && !row.is('body, html')) {
      const cells = row.children();
      // Six distinct cells: the label followed by one value per named plan.
      if (cells.length === 6 && labels.has(cells.first().find('*').addBack().filter((_, node) => labels.has($(node).text().replace(/\s+/g, ' ').trim())).first().text().replace(/\s+/g, ' ').trim())) {
        const values = cells.slice(1).map((_, cell) => $(cell).text().trim()).get();
        if (values.every(value => /^\d+(?:[.,]\d+)?\s*%\s*(?:p\.?\s*a\.?)?$/i.test(value))) {
          const rates = Object.fromEntries(PLANS.map((plan, i) => [plan, parseFloat(values[i].replace(',', '.'))]));
          validateRates(rates);
          candidates.push(rates);
          break;
        }
      }
      row = row.parent();
    }
  });
  // Require an explicit contiguous plan header in the expected column order.
  const headers = $('*').toArray().some(el => {
    const names = $(el).children().map((_, node) => $(node).text().trim()).get();
    return names.length === 5 && names.every((name, i) => name === PLANS[i]);
  });
  if (!headers || !candidates.length || candidates.some(r => JSON.stringify(r) !== JSON.stringify(candidates[0]))) {
    throw new Error('PLN savings table missing, ambiguous, or changed; manual verification required.');
  }
  return candidates[0];
}

async function fetchRates(fetchImpl = fetch) {
  // One ordinary request. Do not solve challenges, spoof a browser, or use proxy fallbacks.
  const response = await fetchImpl(TARGET_URL, {
    headers: { 'User-Agent': 'RevoSavingsRateChecker/1.0 (+https://github.com/Jabolo/revo-savings)', Accept: 'text/html' },
    signal: AbortSignal.timeout(30000), redirect: 'error'
  });
  if (!response.ok) {
    const error = new Error(`Revolut returned HTTP ${response.status}; existing rates retained.`);
    error.code = `http_${response.status}`;
    throw error;
  }
  if (!response.headers.get('content-type')?.includes('text/html')) throw new Error('Unexpected source content type.');
  return extractRates(await response.text());
}

async function updateRates({ ratesPath = RATES_PATH, fetchImpl = fetch, now = new Date().toISOString() } = {}) {
  // Refuse to replace a corrupt baseline, including on a failed request.
  const existing = validateData(JSON.parse(fs.readFileSync(ratesPath, 'utf8')));
  let output;
  let failure;
  try {
    const rates = await fetchRates(fetchImpl);
    const changed = PLANS.some(plan => existing.rates[plan] !== rates[plan]);
    output = { ...existing, updatedAt: changed ? now : existing.updatedAt, rates,
      lastAttemptAt: now, lastVerifiedAt: now, verificationStatus: 'ok', lastError: null, sourceUrl: TARGET_URL };
    console.log(changed ? 'Source verified: PLN rates changed.' : 'Source verified: PLN rates unchanged.');
  } catch (error) {
    failure = error;
    output = { ...existing, lastAttemptAt: now, lastVerifiedAt: existing.lastVerifiedAt || null,
      verificationStatus: 'error', lastError: /^http_\d{3}$/.test(error.code || '') ? error.code : 'verification_failed', sourceUrl: TARGET_URL };
    console.error(`Rate verification failed: ${error.message}`);
  }
  validateData(output);
  const temporaryPath = `${ratesPath}.tmp`;
  fs.writeFileSync(temporaryPath, JSON.stringify(output, null, 2) + '\n');
  fs.renameSync(temporaryPath, ratesPath);
  if (failure) throw failure;
  return output;
}

if (require.main === module) updateRates().catch(() => { process.exitCode = 1; });
module.exports = { extractRates, fetchRates, updateRates, TARGET_URL };
