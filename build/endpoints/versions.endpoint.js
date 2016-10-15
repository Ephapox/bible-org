'use strict';

var _ = require('lodash');
var CONFIG = require('./../../config.js');

var URL = CONFIG.URL;

module.exports = {
  getAllVersions: _.template(URL + "/versions.<%= return_type %>"),
  getVersionInfo: _.template(URL + "/versions/<%= version_id %>.<%= return_type %>")
};