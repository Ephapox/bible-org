const _ = require('lodash');
const CONFIG = require('./../../config.js');

const URL = CONFIG.URL;

module.exports = {
  getAllBookgroups: _.template(URL + '/bookgroups.<%= return_type %>'),
  getBookgroup: _.template(URL + '/bookgroups/<%= bookgroup_id %>.<%= return_type %>')
};
