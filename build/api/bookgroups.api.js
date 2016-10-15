'use strict';

var bookgroups_endpoints = require('./../endpoints/bookgroups.endpoint.js');
var utils = require('./../utils.js');

var bookgroups_api = {
  getAllBookgroups: getAllBookgroups,
  getBookgroup: getBookgroup
};

function getAllBookgroups() {
  var return_type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "js";

  return utils.standardPromise(bookgroups_endpoints.getAllBookgroups, {
    return_type: return_type
  });
};

function getBookgroup(bookgroup_id) {
  var return_type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "js";

  return utils.standardPromise(bookgroups_endpoints.getBookgroup, {
    bookgroup_id: bookgroup_id,
    return_type: return_type
  });
};

module.exports = bookgroups_api;