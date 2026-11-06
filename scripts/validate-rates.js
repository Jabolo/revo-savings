const fs = require('node:fs');
const path = require('node:path');
const { validateData } = require('../rates-core');
validateData(JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'rates.json'), 'utf8')));
console.log('Stored rates and metadata are valid (this does not verify the source).');
