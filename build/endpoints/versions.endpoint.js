"use strict";

var _ = require('lodash');

module.exports = {
  getAllVersions: _.template("/versions.<%= return_type %>"),
  getVersionInfo: _.template("/versions/<%= version_id %>.<%= return_type %>")
};