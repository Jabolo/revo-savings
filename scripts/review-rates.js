const fs = require('node:fs');
const path = require('node:path');
const { PLANS, validateRates, validateData } = require('../rates-core');

const RATES_PATH = path.join(__dirname, '..', 'rates.json');
const TARGET_URL = 'https://www.revolut.com/pl-PL/our-pricing-plans/';

function parseRateValue(raw, plan) {
  if (typeof raw === 'number' && Number.isFinite(raw)) return raw;
  if (typeof raw === 'string' && /^\d+(?:\.\d+)?$/.test(raw.trim())) return Number(raw.trim());
  throw new Error(`Invalid or missing rate for plan ${plan}.`);
}

function applyReview({
  ratesPath = RATES_PATH,
  rates,
  reviewedAt = new Date().toISOString(),
  sourceCrawlDate = reviewedAt.slice(0, 10),
  sourceUrl = TARGET_URL
} = {}) {
  const existing = validateData(JSON.parse(fs.readFileSync(ratesPath, 'utf8')));
  if (!rates || typeof rates !== 'object') throw new Error('Missing rates object.');
  const cleanedRates = Object.fromEntries(PLANS.map(plan => [plan, parseRateValue(rates[plan], plan)]));
  validateRates(cleanedRates);

  const changed = PLANS.some(plan => existing.rates[plan] !== cleanedRates[plan]);
  const output = {
    ...existing,
    updatedAt: changed ? reviewedAt : existing.updatedAt,
    rates: cleanedRates,
    sourceUrl,
    currency: 'PLN',
    sourceReview: {
      reviewedAt,
      method: 'manual-web-review',
      sourceUrl,
      sourceCrawlDate,
      rates: cleanedRates
    }
  };

  validateData(output);
  const temporaryPath = `${ratesPath}.tmp`;
  fs.writeFileSync(temporaryPath, JSON.stringify(output, null, 2) + '\n');
  fs.renameSync(temporaryPath, ratesPath);
  return { output, changed };
}

function parseCliArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i++) {
    const token = argv[i];
    if (!token.startsWith('--')) continue;
    const key = token.slice(2);
    const next = argv[i + 1];
    if (next !== undefined && !next.startsWith('--')) {
      args[key] = next;
      i++;
    } else {
      args[key] = true;
    }
  }
  return args;
}

function resolveReviewInput(args) {
  if (args.file) {
    const report = JSON.parse(fs.readFileSync(path.resolve(String(args.file)), 'utf8'));
    const rawRates = report.observed_rates || report.rates;
    if (!rawRates || typeof rawRates !== 'object') throw new Error('Report file does not contain observed_rates or rates.');
    const rates = Object.fromEntries(PLANS.map(plan => [plan, parseRateValue(rawRates[plan], plan)]));
    const reviewedAt = typeof args['reviewed-at'] === 'string' ? args['reviewed-at'] : (report.checked_at_utc || new Date().toISOString());
    const sourceCrawlDate = typeof args['crawl-date'] === 'string' ? args['crawl-date'] : (report.crawl_date || reviewedAt.slice(0, 10));
    return { rates, reviewedAt, sourceCrawlDate };
  }
  const rates = Object.fromEntries(PLANS.map(plan => [plan, parseRateValue(args[plan], plan)]));
  const reviewedAt = typeof args['reviewed-at'] === 'string' ? args['reviewed-at'] : new Date().toISOString();
  const sourceCrawlDate = typeof args['crawl-date'] === 'string' ? args['crawl-date'] : reviewedAt.slice(0, 10);
  return { rates, reviewedAt, sourceCrawlDate };
}

if (require.main === module) {
  try {
    const args = parseCliArgs(process.argv.slice(2));
    const { rates, reviewedAt, sourceCrawlDate } = resolveReviewInput(args);
    const { output, changed } = applyReview({
      ratesPath: typeof args['rates-path'] === 'string' ? path.resolve(args['rates-path']) : RATES_PATH,
      rates,
      reviewedAt,
      sourceCrawlDate
    });
    console.log(changed ? 'Updated PLN rates and sourceReview.' : 'Confirmed unchanged PLN rates; updated sourceReview.', output.rates);
  } catch (error) {
    console.error(`Failed to record rate review: ${error.message}`);
    process.exitCode = 1;
  }
}

module.exports = { applyReview, parseCliArgs, resolveReviewInput, TARGET_URL };
