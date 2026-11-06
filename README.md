# Revo Savings calculator

PLN savings simulation: https://revo-savings-calculator.web.app/

## Run and verify

Node.js 22+:

```sh
npm ci
npm test
npm start          # one ordinary request to Revolut; nonzero exit on failure
npm run build     # validate the retained data and prepare dist/
python3 -m http.server 8764 --directory dist
```

`rates.json` keeps the last valid rates. `updatedAt` is the last saved rate-change
time (historical data uses its original save timestamp), `lastAttemptAt` is the
latest source request, and `lastVerifiedAt` is only set by a successful complete
source read. Historical timestamps are not retroactively treated as verification.
`verificationStatus: error` and `lastError` describe the latest failed attempt.
The file is replaced atomically. A failed read never changes rate values or the
last successful verification time. A successful unchanged check updates verification
metadata intentionally; these commits are monitoring records, not rate changes.

The UI distinguishes verified, expired (over 48 hours), failed, unverified,
unavailable/default, and manually edited rates. It fetches the deployed same-origin
file only. Loading a JSON file is not live verification. The official rate shown
in a customer's Revolut app may differ from the general offer.

## Source access limitation

The source is the public Polish [plan comparison](https://www.revolut.com/pl-PL/our-pricing-plans/).
On 6 November 2026 an ordinary request returned HTTP 403. This project does not
solve challenges, disguise automation, rotate proxies, query private endpoints,
or treat a cached search result as a fresh check. No independently accessible
permitted machine-readable feed was established. Until access is allowed or an
official feed is supplied, the site retains the old rates, shows the failure,
and scheduled verification will remain red. A successful parser path is fixture
tested; the current source DOM cannot be validated through a blocked request.

## CI and recovery

The existing `Update Savings Rates` workflow:

- tests every push/PR; production runs are serialized;
- on schedule (06:00 UTC) or manual dispatch, attempts source verification and
  commits the resulting verification metadata;
- validates retained data, builds an explicit static-file allowlist, then deploys
  on **every** production run, including unchanged or failed source checks;
- fails if the existing Firebase credential is missing or deployment fails;
- compares production HTML, JS and JSON byte-for-byte with the build;
- finally reports a failed source check as a workflow failure, even if hosting
  deployment succeeded. Inspect these outcomes separately.

A failed deployment is retried on the next scheduled/manual production run even
if rates are unchanged. To retry immediately, dispatch the existing workflow.
Do not mint or broaden credentials to hide a failure. To roll back calculator
code, revert the relevant code commit and push to main; preserve the current
`rates.json` verification record. A revert is a deployment, not a new source check.

## Calculation assumptions

The calculator estimates daily compounding or simple interest with a fixed rate
and a 365-day year; it does not simulate settlement delays, leap years, daily
cent rounding, changing rates, or account-specific promotions. Tax is deducted
from total earned interest at the user-entered rate. Revolut's Polish
[interest explanation](https://help.revolut.com/en-PL/help/app-features/savings-vaults/earning-interest-with-instant-access-savings/)
and [tax information](https://help.revolut.com/en-PL/help/app-features/savings-vaults/tax-on-instant-access-savings/)
explain actual accrual and tax responsibilities.

Plan and position costs are prorated over a 365-day year: 12 monthly fees,
or the separately entered annual plan price, plus 12 position-cost payments.
Annual billing uses the actual published annual tariff, never a multiplier of
the monthly price. It does not model an upfront annual payment or early
cancellation. All monthly and annual prices can be edited independently. This
is a simulation, not an account statement.

## Published plan prices

`plan-prices.js` is a dated tariff snapshot checked against official Polish
help pages on **6 November 2026** (not a live machine verification):

| Plan | Monthly PLN | Annual PLN | Official source |
| --- | ---: | ---: | --- |
| Standard | 0 | 0 | [Standard](https://help.revolut.com/pl-PL/help/profile-and-plan/my-plan-benefits/revolut-plans1/standard-plan/) |
| Plus | 19.99 | 200 | [Plus](https://help.revolut.com/pl-PL/help/profile-and-plan/my-plan-benefits/revolut-plans1/plus-plan/) |
| Premium | 33.99 | 340 | [Premium](https://help.revolut.com/pl-PL/help/profile-and-plan/my-plan-benefits/revolut-plans1/premium-plan/) |
| Metal | 55.99 | 560 | [Metal](https://help.revolut.com/pl-PL/help/profile-and-plan/my-plan-benefits/revolut-plans1/metal-plan/) |
| Ultra | 260 | 2520 | [Ultra](https://help.revolut.com/pl-PL/help/profile-and-plan/my-plan-benefits/revolut-plans1/ultra-plan1/) |

The UI shows the snapshot date and source links. Editing prices marks them as
custom; it does not change their source record or claim a fresh verification.
Prices and savings rates have separate provenance and freshness.

On the same date, an ordinary identified request to the independent Plus help
page also returned **HTTP 403**. Help pages publish savings maxima (up to a rate,
potentially dependent on balance), but their direct automated readability was not
established. No automatic fallback was added to them, search caches, undocumented
APIs or proxy services. Official Open Banking documentation requires regulated
third-party access; it does not establish an unauthenticated public savings-rate
feed. No new access or credentials were requested or created.
