'use strict';

var _ = require('lodash');
var CONFIG = require('./../../config.js');

var URL = CONFIG.URL;

module.exports = {
  getAllBookgroups: _.template(URL + '/bookgroups.<%= return_type %>'),
  getBookgroup: _.template(URL + '/bookgroups/<%= bookgroup_id %>.<%= return_type %>')
};