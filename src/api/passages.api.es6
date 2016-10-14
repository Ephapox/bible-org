const passages_endpoints = require('./../endpoints/passages.endpoint.js');
const utils = require('./../utils.js');
const _ = require('lodash');

const passages_api = {
  getPassages: getPassages
};

function getPassages(params, return_type="js") {
  if(params.hasOwnProperty("q[]")) {
    params['q[]'] = utils.arrayToParams(params['q[]']);
  }
  if(params.hasOwnProperty("version")) {
    params['version'] = utils.arrayToParams(params['version']);
  }
  return utils.standardPromise(
    passages_endpoints.getPassages,
    {
      return_type: return_type
    },
    params
  )
};

module.exports = passages_api;
