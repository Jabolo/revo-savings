const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
(async () => {
  for (const file of ['rates.json', 'index.html', 'script.js', 'rates-core.js', 'plan-prices.js']) {
    const response = await fetch(`https://revo-savings-calculator.web.app/${file}`, { cache: 'no-store', signal: AbortSignal.timeout(30000) });
    assert.equal(response.status, 200, file);
    assert.equal(await response.text(), fs.readFileSync(path.join(__dirname, '..', 'dist', file), 'utf8'), `${file} differs from build`);
  }
  console.log('Production serves the exact deployed calculator and verification state.');
})().catch(error => { console.error(error.message); process.exitCode = 1; });
