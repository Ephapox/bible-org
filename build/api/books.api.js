'use strict';

var books_endpoints = require('./../endpoints/books.endpoint.js');
var utils = require('./../utils.js');

var books_api = {
  getAllBooks: getAllBooks,
  getAllBooksByBookgroups: getAllBooksByBookgroups,
  getBook: getBook
};

function getAllBooks(version_id, params) {
  var return_type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "js";

  return utils.standardPromise(books_endpoints.getAllBooks, {
    version_id: version_id,
    return_type: return_type
  }, params);
};

function getAllBooksByBookgroups(group_id, params) {
  var return_type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "js";

  return utils.standardPromise(books_endpoints.getAllBooksByBookgroups, {
    group_id: group_id,
    return_type: return_type
  }, params);
};

function getBook(version_id, book_name, params) {
  var return_type = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "js";

  return utils.standardPromise(books_endpoints.getBook, {
    version_id: version_id,
    book_name: book_name,
    return_type: return_type
  }, params);
};

module.exports = books_api;