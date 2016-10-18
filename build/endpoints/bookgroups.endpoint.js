'use strict';

var _ = require('lodash');

module.exports = {
  getAllBookgroups: _.template('/bookgroups.<%= return_type %>'),
  getBookgroup: _.template('/bookgroups/<%= bookgroup_id %>.<%= return_type %>')
};