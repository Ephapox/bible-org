const _ = require('lodash');
const request = require('request');

const utils = {
  // parses response body using try/catch and resolve/reject.
  standardGet: standardGet,
  // adds query parameters to url.
  addParams: addParams,
  standardPromise: standardPromise,
  arrayToParams: arrayToParams
};

function standardGet(error, body, resolve, reject) {
  if(error && reject) return reject({error: error, body: body});
  if(error && !reject) return {error: error, body: body};

  let jsonBody = {};
  
  try {
    jsonBody = JSON.parse(body);
  } catch(e) {
    let errorObj = {
      error: e,
      body: body
    };
    if(reject) {
      return reject(errorObj); 
    } else {
      return errorObj;
    }
  }

  if(resolve) {
    return resolve(jsonBody); 
  } else {
    return jsonBody;
  }
};

function addParams(url, params) {
  _.forEach(params, (value, key, idx) => {
    if(!url.match(/\?/g)) {
      url += `?${key}=${value}`;
    } else {
      url += `&${key}=${value}`;
    }
  });
  return url;
};

function arrayToParams(paramArray) {
  return _.reduce(paramArray, (acc, value, idx) => {
    if(idx === 0) {
      return acc += encodeURI(value.replace(" ", "+"));
    } else {
      return acc += "," + encodeURI(value.replace(" ", "+"));
    }
  }, "");
}; 

function standardPromise(endpoint, args, params) {
  return new Promise((resolve, reject) => {
    let compiledUrl = utils.addParams(endpoint(args), params);

    request(compiledUrl, (error, response, body) => {
      standardGet(error, body, resolve, reject);
    });
  });
};

module.exports = utils;
