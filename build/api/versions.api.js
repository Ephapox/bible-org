'use strict';

var request = require('request');

var versions_endpoints = require('./../endpoints/versions.endpoint.js');
var utils = require('./../utils.js');

var versions_api = {
  getAllVersions: getAllVersions,
  getVersionInfo: getVersionInfo
};

/*
 * @function getAllVersions
 * @description Returns all versions
 * @param {object} params url parameters
 *  language: ISO 639-2 abbreviation of language to filter versions.
 * */
function getAllVersions(params) {
  var return_type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "js";

  return utils.standardPromise(versions_endpoints.getAllVersions, {
    return_type: "js"
  }, params);
};

function getVersionInfo(version_id, params) {
  var return_type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "js";

  return utils.standardPromise(versions_endpoints.getVersionInfo, {
    version_id: version_id,
    return_type: return_type
  }, params);
};

module.exports = versions_api;