const _ = require('lodash');
const CONFIG = require('./../../config.js');

const URL = CONFIG.URL;

module.exports = {
  getPassages: _.template(URL + "/passages.<%= return_type %>"),
};
