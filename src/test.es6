const test = require('ava');
const CONFIG = require('./../config.js');

test('config has bible.org key', t => {
  t.true(CONFIG.hasOwnProperty('BIBLE_ORG_KEY'));
});
