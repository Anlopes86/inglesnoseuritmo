// Keep the CI entry point, but audit the current section player rather than retired .slide markup.
const path = require('node:path');
process.env.A2_BROWSER_ARTIFACTS ||= path.join(__dirname, 'browser-audit-artifacts');
require('../tools/audit-a2-v3-format-browser.cjs');
