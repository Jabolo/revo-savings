/* Official Polish public tariff snapshot, checked separately from savings rates. */
(function (root, factory) {
  const snapshot = factory();
  if (typeof module === 'object' && module.exports) module.exports = snapshot;
  else root.RevoPlanPrices = snapshot;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  const helpRoot = 'https://help.revolut.com/pl-PL/help/profile-and-plan/my-plan-benefits/revolut-plans1/';
  return {
    currency: 'PLN',
    verifiedOn: '2026-11-06',
    verificationMethod: 'manual-official-help-review',
    plans: {
      Standard: { monthly: 0, annual: 0, sourceUrl: helpRoot + 'standard-plan/' },
      Plus: { monthly: 19.99, annual: 200, sourceUrl: helpRoot + 'plus-plan/' },
      Premium: { monthly: 33.99, annual: 340, sourceUrl: helpRoot + 'premium-plan/' },
      Metal: { monthly: 55.99, annual: 560, sourceUrl: helpRoot + 'metal-plan/' },
      Ultra: { monthly: 260, annual: 2520, sourceUrl: helpRoot + 'ultra-plan1/' }
    }
  };
});
