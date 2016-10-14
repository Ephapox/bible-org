const request = require('request');

const versions_endpoints = require('./../endpoints/versions.endpoint.js');
const utils = require('./../utils.js');

const versions_api = {
  getAllVersions: getAllVersions,
  getVersionInfo: getVersionInfo
};

/*
 * @function getAllVersions
 * @description Returns all versions
 * @param {object} params url parameters
 *  language: ISO 639-2 abbreviation of language to filter versions.
 * */
function getAllVersions(params, return_type="js") {
  return utils.standardPromise(
    versions_endpoints.getAllVersions, 
    {
      return_type: "js"
    }, 
    params
  );
};

function getVersionInfo(version_id, params, return_type="js") {
  return utils.standardPromise(
    versions_endpoints.getVersionInfo, 
    {
      version_id: version_id,
      return_type: return_type 
    },
    params
  );
};

module.exports = versions_api;
