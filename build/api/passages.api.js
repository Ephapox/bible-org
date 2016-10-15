'use strict';

var passages_endpoints = require('./../endpoints/passages.endpoint.js');
var utils = require('./../utils.js');
var _ = require('lodash');

var passages_api = {
  getPassages: getPassages
};

function getPassages(params) {
  var return_type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "js";

  if (params.hasOwnProperty("q[]")) {
    params['q[]'] = utils.arrayToParams(params['q[]']);
  }
  if (params.hasOwnProperty("version")) {
    params['version'] = utils.arrayToParams(params['version']);
  }
  return utils.standardPromise(passages_endpoints.getPassages, {
    return_type: return_type
  }, params);
};

module.exports = passages_api;