const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { PLANS, validateData, freshness, calculatePlan } = require('../rates-core');
const { extractRates, updateRates } = require('../scripts/update-rates');
const rates = { Standard: 2, Plus: 2, Premium: 2.25, Metal: 3, Ultra: 3.25 };
const oldDate = '2026-11-05T13:35:13.907Z';
const now = '2026-11-06T12:00:00.000Z';
const html = `<html lang="pl"><head><title>Porównaj plany</title></head><body>
<div>${PLANS.map(p => `<div>${p}</div>`).join('')}</div>
<div><div><span>Sejfy na oszczędności (PLN)</span></div>${Object.values(rates).map(v => `<div><span>${v}% p.a.</span></div>`).join('')}</div>
<div>Unrelated cashback: 1%</div></body></html>`;
const response = body => ({ ok: true, headers: new Headers({ 'content-type': 'text/html' }), text: async () => body });
function fixture(t, extra = {}) {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'revo-test-'));
  t.after(() => fs.rmSync(directory, { recursive: true, force: true }));
  const ratesPath = path.join(directory, 'rates.json');
  fs.writeFileSync(ratesPath, JSON.stringify({ updatedAt: oldDate, rates, ...extra }));
  return ratesPath;
}

test('extracts exactly the labelled PLN row, supporting comma decimals', () => {
  assert.deepEqual(extractRates(html.replace('2.25%', '2,25%')), rates);
});
test('fails closed on missing cells, label, wrong order, conflicting rows and challenges', () => {
  for (const badHtml of [html.replace('3.25% p.a.', 'missing'), html.replace('Sejfy na oszczędności (PLN)', 'EUR'),
    html.replace('<div>Standard</div><div>Plus</div>', '<div>Plus</div><div>Standard</div>'),
    html.replace('Porównaj plany', 'Just a moment...'),
    html + html.replace('3.25%', '3.5%')]) assert.throws(() => extractRates(badHtml));
});
test('zero rates are valid and invalid numeric data is rejected', () => {
  validateData({ updatedAt: oldDate, rates: Object.fromEntries(PLANS.map(p => [p, 0])) });
  for (const value of [null, '2', NaN, Infinity, -1, 16]) assert.throws(() => validateData({ updatedAt: oldDate, rates: { ...rates, Standard: value } }));
});
test('HTTP 403 preserves last good rates and timestamp, records failure, and rejects', async t => {
  const ratesPath = fixture(t);
  let requests = 0;
  await assert.rejects(updateRates({ ratesPath, now, fetchImpl: async () => { requests++; return { ok: false, status: 403 }; } }), /HTTP 403/);
  const saved = JSON.parse(fs.readFileSync(ratesPath));
  assert.equal(requests, 1);
  assert.deepEqual(saved.rates, rates);
  assert.equal(saved.updatedAt, oldDate);
  assert.equal(saved.lastVerifiedAt, null);
  assert.equal(saved.lastAttemptAt, now);
  assert.equal(saved.verificationStatus, 'error');
  assert.equal(saved.lastError, 'http_403');
});
test('successful unchanged check refreshes verification, not rate change time', async t => {
  const ratesPath = fixture(t, { lastAttemptAt: oldDate, lastVerifiedAt: null, verificationStatus: 'error' });
  const data = await updateRates({ ratesPath, now, fetchImpl: async () => response(html) });
  assert.deepEqual(data.rates, rates);
  assert.equal(data.updatedAt, oldDate);
  assert.equal(data.lastVerifiedAt, now);
  assert.equal(data.verificationStatus, 'ok');
  assert.equal(data.lastError, null);
});
test('changed rates update change time only after a complete validated source read', async t => {
  const data = await updateRates({ ratesPath: fixture(t), now, fetchImpl: async () => response(html.replace('3.25%', '3.5%')) });
  assert.equal(data.updatedAt, now);
  assert.equal(data.rates.Ultra, 3.5);
});
test('timeout/parse failure retain the last successful verification', async t => {
  for (const fetchImpl of [async () => { throw new Error('Timeout'); }, async () => response('<html>Unknown table</html>')]) {
    const ratesPath = fixture(t, { verificationStatus: 'ok', lastAttemptAt: oldDate, lastVerifiedAt: oldDate });
    await assert.rejects(updateRates({ ratesPath, now, fetchImpl }));
    const data = JSON.parse(fs.readFileSync(ratesPath));
    assert.equal(data.lastVerifiedAt, oldDate);
    assert.equal(data.updatedAt, oldDate);
    assert.deepEqual(data.rates, rates);
  }
});
test('corrupt baseline is never overwritten', async t => {
  const ratesPath = fixture(t);
  fs.writeFileSync(ratesPath, '{broken');
  await assert.rejects(updateRates({ ratesPath, now, fetchImpl: async () => response(html) }));
  assert.equal(fs.readFileSync(ratesPath, 'utf8'), '{broken');
});
test('freshness distinguishes missing, legacy, verified, expired, future and failed checks', () => {
  const data = { verificationStatus: 'ok', lastVerifiedAt: now };
  assert.equal(freshness(null), 'unavailable');
  assert.equal(freshness({ rates }), 'unverified');
  assert.equal(freshness(data, Date.parse(now)), 'verified');
  assert.equal(freshness(data, Date.parse(now) + 49 * 3600000), 'stale');
  assert.equal(freshness(data, Date.parse(now) - 1), 'stale');
  assert.equal(freshness({ ...data, verificationStatus: 'error' }, Date.parse(now)), 'error');
});
const input = { principal: 100000, annualRate: 2, days: 365, taxRate: 19, monthlyPlanCost: 19.99, annualPlanCost: 200, positionCost: 10, annualBilling: false, compound: false };
test('one-year simple interest, tax and 12 monthly fees match hand calculation', () => {
  const result = calculatePlan(input);
  assert.equal(result.grossInterest, 2000);
  assert.equal(result.netInterest, 1620);
  assert.ok(Math.abs(result.periodCost - 359.88) < 1e-8);
  assert.ok(Math.abs(result.profitAfterCost - 1260.12) < 1e-8);
});
test('annual billing uses the independent annual tariff plus twelve position costs', () => {
  const result = calculatePlan({ ...input, annualBilling: true });
  assert.ok(Math.abs(result.periodCost - 320) < 1e-8);
});
test('daily compounding matches an independent daily balance loop', () => {
  let balance = input.principal;
  for (let day = 0; day < 365; day++) balance += balance * 0.02 / 365;
  assert.ok(Math.abs(calculatePlan({ ...input, compound: true }).grossInterest - (balance - input.principal)) < 1e-6);
});
test('zero days/capital/rate and full tax are supported; invalid inputs fail', () => {
  assert.equal(calculatePlan({ ...input, days: 0 }).profitAfterCost, 0);
  assert.equal(calculatePlan({ ...input, principal: 0 }).grossInterest, 0);
  assert.equal(calculatePlan({ ...input, annualRate: 0, compound: true }).grossInterest, 0);
  assert.equal(calculatePlan({ ...input, taxRate: 100 }).netInterest, 0);
  for (const change of [{ taxRate: 101 }, { days: 1.5 }, { principal: Infinity }, { principal: 1e308, annualRate: 100, days: 36500, compound: true }, { monthlyPlanCost: NaN }, { annualRate: -1 }]) assert.throws(() => calculatePlan({ ...input, ...change }));
});

const prices = require('../plan-prices');
test('official Polish annual tariffs match the checked 6 November snapshot', () => {
  assert.equal(prices.currency, 'PLN');
  assert.equal(prices.verifiedOn, '2026-11-06');
  assert.deepEqual(PLANS.map(plan => prices.plans[plan].annual), [0, 200, 340, 560, 2520]);
  for (const plan of PLANS) {
    const price = prices.plans[plan];
    assert.ok(price.sourceUrl.startsWith('https://help.revolut.com/pl-PL/help/'));
    const result = calculatePlan({ ...input, monthlyPlanCost: price.monthly, annualPlanCost: price.annual, annualBilling: true, positionCost: 0 });
    assert.ok(Math.abs(result.periodCost - price.annual) < 1e-8);
  }
});
test('Ultra is 2520 per year and 210 average per month, independently of 260 monthly', () => {
  const result = calculatePlan({ ...input, monthlyPlanCost: 260, annualPlanCost: 2520, annualBilling: true, positionCost: 0 });
  assert.equal(result.monthlyCost, 210);
  assert.equal(result.periodCost, 2520);
  assert.equal(calculatePlan({ ...input, monthlyPlanCost: 260, annualPlanCost: 2520, positionCost: 0 }).periodCost, 3120);
});
test('custom annual fees are independent, prorated by day, and validated', () => {
  assert.equal(calculatePlan({ ...input, annualPlanCost: 1000, annualBilling: true, positionCost: 0, days: 73 }).periodCost, 200);
  assert.equal(calculatePlan({ ...input, annualPlanCost: 2520, annualBilling: true, positionCost: 0, days: 730 }).periodCost, 5040);
  for (const annualPlanCost of [undefined, NaN, Infinity, -1]) assert.throws(() => calculatePlan({ ...input, annualBilling: true, annualPlanCost }));
});
test('static price inputs match the sourced defaults used by the browser', () => {
  const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
  for (const plan of PLANS) {
    for (const [prefix, field] of [['cost', 'monthly'], ['annualCost', 'annual']]) {
      const value = html.match(new RegExp(`id="${prefix}${plan}" value="([^\"]+)"`));
      assert.ok(value, `${prefix}${plan}`);
      assert.equal(Number(value[1]), prices.plans[plan][field]);
    }
  }
});
