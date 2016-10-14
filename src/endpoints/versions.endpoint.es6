const _ = require('lodash');
const CONFIG = require('./../../config.js');

const URL = CONFIG.URL;

module.exports = {
  getAllVersions: _.template(URL + "/versions.<%= return_type %>"),
  getVersionInfo: _.template(URL + "/versions/<%= version_id %>.<%= return_type %>")
};
