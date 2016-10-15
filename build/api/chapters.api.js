'use strict';

var chapters_endpoints = require('./../endpoints/chapters.endpoint.js');
var utils = require('./../utils.js');

var chapters_api = {
  getAllBookChapters: getAllBookChapters,
  getBookChapter: getBookChapter
};

function getAllBookChapters(version_id, book_id) {
  var return_type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "js";

  return utils.standardPromise(chapters_endpoints.getAllBookChapters, {
    version_id: version_id,
    book_id: book_id,
    return_type: return_type
  });
};

function getBookChapter(version_id, book_id, chapter_number) {
  var return_type = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "js";

  return utils.standardPromise(chapters_endpoints.getBookChapter, {
    version_id: version_id,
    book_id: book_id,
    chapter_number: chapter_number,
    return_type: return_type
  });
};

module.exports = chapters_api;