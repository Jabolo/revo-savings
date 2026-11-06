const fs = require('node:fs');
const path = require('node:path');
require('./validate-rates');
const root = path.join(__dirname, '..');
const target = path.join(root, 'dist');
fs.rmSync(target, { recursive: true, force: true });
fs.mkdirSync(target, { recursive: true });
// Explicit allowlist prevents publishing tooling, tests, or unrelated workspace files.
for (const file of ['index.html', '404.html', 'styles.css', 'script.js', 'rates-core.js', 'rates.json', 'robots.txt', 'google105318165a355ae0.html']) {
  fs.copyFileSync(path.join(root, file), path.join(target, file));
}
console.log('Static hosting files prepared in dist/.');
