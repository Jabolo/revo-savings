/* Shared browser/Node rules: never label a downloaded file as a live source check. */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.RevoRates = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  const PLANS = ['Standard', 'Plus', 'Premium', 'Metal', 'Ultra'];
  function validateRates(rates) {
    if (!rates || PLANS.some(plan => !Number.isFinite(rates[plan]) || rates[plan] < 0 || rates[plan] > 15)) {
      throw new Error('Expected five finite PLN annual rates between 0 and 15%.');
    }
    if (PLANS.some((plan, index) => index > 0 && rates[plan] < rates[PLANS[index - 1]])) {
      throw new Error('Unexpected plan rate ordering; manual verification required.');
    }
  }
  function validDate(value) {
    return typeof value === 'string' && Number.isFinite(Date.parse(value));
  }
  function validateData(data) {
    validateRates(data?.rates);
    if (!validDate(data.updatedAt)) throw new Error('Missing rate change timestamp.');
    const hasVerification = data.verificationStatus !== undefined;
    if (hasVerification) {
      if (!['ok', 'error'].includes(data.verificationStatus) || !validDate(data.lastAttemptAt)) {
        throw new Error('Invalid verification metadata.');
      }
      if (data.lastVerifiedAt !== null && !validDate(data.lastVerifiedAt)) throw new Error('Invalid verification timestamp.');
      if (data.verificationStatus === 'ok' && data.lastVerifiedAt !== data.lastAttemptAt) throw new Error('Success must identify this verification.');
      if (data.lastVerifiedAt && Date.parse(data.lastVerifiedAt) > Date.parse(data.lastAttemptAt)) throw new Error('Verification follows attempt.');
    }
    return data;
  }
  function freshness(data, now = Date.now()) {
    if (!data) return 'unavailable';
    if (data.verificationStatus === 'error') return 'error';
    if (data.verificationStatus !== 'ok' || !validDate(data.lastVerifiedAt)) return 'unverified';
    const age = now - Date.parse(data.lastVerifiedAt);
    return age >= 0 && age <= 48 * 60 * 60 * 1000 ? 'verified' : 'stale';
  }
  function calculatePlan({ principal, annualRate, days, taxRate, monthlyPlanCost, annualPlanCost, positionCost, annualBilling, compound }) {
    if (![principal, annualRate, days, taxRate, monthlyPlanCost, positionCost].every(Number.isFinite)
      || principal < 0 || annualRate < 0 || annualRate > 100 || !Number.isInteger(days) || days < 0 || days > 36500
      || taxRate < 0 || taxRate > 100 || monthlyPlanCost < 0 || positionCost < 0) throw new Error('Invalid simulation inputs.');
    if (annualBilling && (!Number.isFinite(annualPlanCost) || annualPlanCost < 0)) throw new Error('Invalid annual plan price.');
    // Independent annual tariff; prorate costs over a 365-day simulation year.
    const monthlyCost = (annualBilling ? annualPlanCost / 12 : monthlyPlanCost) + positionCost;
    const periodCost = monthlyCost * 12 * days / 365;
    const grossInterest = compound
      ? principal * Math.expm1(days * Math.log1p(annualRate / 100 / 365))
      : principal * annualRate / 100 * days / 365;
    const netInterest = grossInterest * (1 - taxRate / 100);
    const result = { monthlyCost, periodCost, grossInterest, netInterest, profitAfterCost: netInterest - periodCost };
    if (!Object.values(result).every(Number.isFinite)) throw new Error('Simulation exceeds supported numeric range.');
    return result;
  }
  return { PLANS, validateRates, validateData, freshness, calculatePlan };
});
