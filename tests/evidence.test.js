const test = require('node:test');
const assert = require('node:assert/strict');
const { rateEvidence, validateData } = require('../rates-core');
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
