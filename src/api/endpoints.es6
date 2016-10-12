const CONFIG = require('./../../config.js');
const URL = `https://${CONFIG.BIBLE_ORG_KEY}:X@bibles.org/v2`;

module.exports = {
  versions: URL + "/versions.js"
};
