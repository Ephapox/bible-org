const bookgroups_endpoints = require('./../endpoints/bookgroups.endpoint.js');
const utils = require('./../utils.js');

const bookgroups_api = {
  getAllBookgroups: getAllBookgroups,
  getBookgroup: getBookgroup
};

function getAllBookgroups(return_type="js") {
  return utils.standardPromise(
    bookgroups_endpoints.getAllBookgroups,
    {
      return_type: return_type
    }
  );
};

function getBookgroup(bookgroup_id, return_type="js") {
  return utils.standardPromise(
    bookgroups_endpoints.getBookgroup,
    {
      bookgroup_id: bookgroup_id,
      return_type: return_type
    }
  );
};

module.exports = bookgroups_api;
