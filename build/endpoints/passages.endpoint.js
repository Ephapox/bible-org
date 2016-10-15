'use strict';

var _ = require('lodash');
var CONFIG = require('./../../config.js');

var URL = CONFIG.URL;

module.exports = {
  getPassages: _.template(URL + "/passages.<%= return_type %>")
};