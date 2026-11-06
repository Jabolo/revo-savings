const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { rateEvidence, validateData } = require('../rates-core');
const { applyReview, parseCliArgs, resolveReviewInput } = require('../scripts/review-rates');
const rates = { Standard: 2, Plus: 2, Premium: 2.25, Metal: 3, Ultra: 3.25 };
const data = { updatedAt: '2026-11-05T13:35:13Z', currency: 'PLN', rates,
  lastAttemptAt: '2026-11-06T17:26:48Z', lastVerifiedAt: null, verificationStatus: 'error', lastError: 'http_403',
  sourceReview: { reviewedAt: '2026-11-06T18:10:15Z', method: 'manual-web-review', sourceCrawlDate: '2026-11-06', sourceUrl: 'https://www.revolut.com/pl-PL/our-pricing-plans/', rates } };
test('manual reading does not manufacture automated success', () => {
  validateData(data);
  assert.equal(rateEvidence(data).kind, 'manual');
  assert.equal(data.lastVerifiedAt, null);
  assert.equal(data.verificationStatus, 'error');
});
test('a later failed check retains the manual reading date', () => {
  assert.equal(rateEvidence({ ...data, lastAttemptAt: '2026-11-07T06:00:00Z' }).date, data.sourceReview.reviewedAt);
});
test('changed automatic rates supersede the prior manual snapshot', () => {
  const newer = { ...data, rates: { ...rates, Ultra: 3.5 }, lastVerifiedAt: '2026-11-07T06:00:00Z' };
  assert.deepEqual(rateEvidence(newer), { kind: 'automatic', date: newer.lastVerifiedAt, sourceUrl: newer.sourceUrl });
});
test('default, legacy and malformed evidence are handled truthfully', () => {
  assert.equal(rateEvidence(null).kind, 'default');
  assert.equal(rateEvidence({ updatedAt: data.updatedAt, rates }).kind, 'stored');
  assert.throws(() => validateData({ ...data, currency: 'GBP' }));
  assert.throws(() => validateData({ ...data, sourceReview: { ...data.sourceReview, method: 'automatic' } }));
});
test('applyReview updates sourceReview without changing updatedAt when rates are unchanged', t => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'revo-review-'));
  t.after(() => fs.rmSync(dir, { recursive: true, force: true }));
  const ratesPath = path.join(dir, 'rates.json');
  fs.writeFileSync(ratesPath, JSON.stringify(data));
  const { output, changed } = applyReview({
    ratesPath,
    rates,
    reviewedAt: '2026-11-06T22:25:00Z',
    sourceCrawlDate: '2026-11-06'
  });
  assert.equal(changed, false);
  assert.equal(output.updatedAt, data.updatedAt);
  assert.equal(output.sourceReview.reviewedAt, '2026-11-06T22:25:00Z');
  assert.deepEqual(output.rates, rates);
});
test('applyReview updates updatedAt and rates when a rate changes and parses CLI flags', t => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'revo-review-'));
  t.after(() => fs.rmSync(dir, { recursive: true, force: true }));
  const ratesPath = path.join(dir, 'rates.json');
  fs.writeFileSync(ratesPath, JSON.stringify(data));
  const args = parseCliArgs(['--Standard', '2', '--Plus', '2', '--Premium', '2.5', '--Metal', '3', '--Ultra', '3.5', '--reviewed-at', '2026-11-07T08:00:00Z', '--crawl-date', '2026-11-07']);
  const resolved = resolveReviewInput(args);
  const { output, changed } = applyReview({ ratesPath, ...resolved });
  assert.equal(changed, true);
  assert.equal(output.updatedAt, '2026-11-07T08:00:00Z');
  assert.equal(output.rates.Premium, 2.5);
  assert.equal(output.rates.Ultra, 3.5);
  assert.equal(output.sourceReview.sourceCrawlDate, '2026-11-07');
});
test('applyReview and resolveReviewInput reject null, boolean, or missing rates and accept valid --file reports', t => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'revo-review-strict-'));
  t.after(() => fs.rmSync(dir, { recursive: true, force: true }));
  const ratesPath = path.join(dir, 'rates.json');
  fs.writeFileSync(ratesPath, JSON.stringify(data));
  for (const bad of [null, true, false, '', '2,25', undefined]) {
    assert.throws(() => applyReview({ ratesPath, rates: { ...rates, Standard: bad } }));
  }
  assert.throws(() => resolveReviewInput(parseCliArgs(['--Standard', '--Plus', '2', '--Premium', '2.25', '--Metal', '3', '--Ultra', '3.25'])));
  const reportPath = path.join(dir, 'latest.json');
  fs.writeFileSync(reportPath, JSON.stringify({
    checked_at_utc: '2026-11-06T22:25:21Z',
    crawl_date: '2026-11-06',
    observed_rates: rates
  }));
  const fromFile = resolveReviewInput(parseCliArgs(['--file', reportPath]));
  assert.deepEqual(fromFile.rates, rates);
  assert.equal(fromFile.reviewedAt, '2026-11-06T22:25:21Z');
  assert.equal(fromFile.sourceCrawlDate, '2026-11-06');
});


