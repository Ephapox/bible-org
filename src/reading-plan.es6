const _ = require('lodash');
const CONFIG = require('./../config.js');
const endpoints = require('./api/endpoints.js');

const request = require('request');

request(endpoints.versions, (err, res, body) => {
  var body = JSON.parse(body);
  var versions = _.chain(body.response.versions)
  .filter({'lang': 'eng-US'})
  .flatMap('name').value();

  console.log(versions);
});
