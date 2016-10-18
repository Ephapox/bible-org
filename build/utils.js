'use strict';

var _ = require('lodash');
var request = require('request');
var apiConfig = require('./../api.config.js');

//const bible_org = require('./bible-org.js');
var utils = {
  // parses response body using try/catch and resolve/reject.
  standardGet: standardGet,
  // adds query parameters to url.
  addParams: addParams,
  standardPromise: standardPromise,
  arrayToParams: arrayToParams
};

function standardGet(error, body, resolve, reject) {
  if (error && reject) return reject({ error: error, body: body });
  if (error && !reject) return { error: error, body: body };

  var jsonBody = {};

  try {
    jsonBody = JSON.parse(body);
  } catch (e) {
    var errorObj = {
      error: e,
      body: body
    };
    if (reject) {
      return reject(errorObj);
    } else {
      return errorObj;
    }
  }

  if (resolve) {
    return resolve(jsonBody);
  } else {
    return jsonBody;
  }
};

function addParams(url, params) {
  _.forEach(params, function (value, key, idx) {
    if (!url.match(/\?/g)) {
      url += '?' + key + '=' + value;
    } else {
      url += '&' + key + '=' + value;
    }
  });
  return url;
};

function arrayToParams(paramArray) {
  return _.reduce(paramArray, function (acc, value, idx) {
    if (idx === 0) {
      return acc += encodeURI(value.replace(" ", "+"));
    } else {
      return acc += "," + encodeURI(value.replace(" ", "+"));
    }
  }, "");
};

function standardPromise(endpoint, args, params) {
  return new Promise(function (resolve, reject) {
    var compiledUrl = apiConfig.url + utils.addParams(endpoint(args), params);

    request(compiledUrl, function (error, response, body) {
      standardGet(error, body, resolve, reject);
    });
  });
};

module.exports = utils;