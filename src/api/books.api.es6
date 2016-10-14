const request = require('request');

const books_endpoints = require('./../endpoints/books.endpoint.js');
const utils = require('./../utils.js');

const books_api = {
  getAllBooks: getAllBooks,
  getAllBooksByBookgroups: getAllBooksByBookgroups,
  getBook: getBook
};

function getAllBooks(version_id, params, return_type="js") {
  return utils.standardPromise(
    books_endpoints.getAllBooks,
    {
      version_id: version_id,
      return_type: return_type 
    },
    params
  );
};

function getAllBooksByBookgroups(group_id, params, return_type="js") {
  return utils.standardPromise(
    books_endpoints.getAllBooksByBookgroups,
    {
      group_id: group_id, 
      return_type: return_type 
    },
    params
  );
};

function getBook(version_id, book_name, params, return_type="js") {
  return utils.standardPromise(
    books_endpoints.getBook,
    {
      version_id: version_id,
      book_name: book_name,
      return_type: return_type
    },
    params
  );
};

module.exports = books_api;
