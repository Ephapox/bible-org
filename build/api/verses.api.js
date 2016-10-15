'use strict';

var request = require('request');

var verses_endpoints = require('./../endpoints/verses.endpoint.js');
var utils = require('./../utils.js');

var verses_api = {
  getAllChapterVerses: getAllChapterVerses,
  getVerses: getVerses,
  getVerse: getVerse
};

function getAllChapterVerses(version_id, book_id, chapter_number, params) {
  var return_type = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "js";

  return utils.standardPromise(verses_endpoints.getAllChapterVerses, {
    version_id: version_id,
    book_id: book_id,
    chapter_number: chapter_number,
    return_type: return_type
  }, params);
};

function getVerses(params) {
  var return_type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "js";

  return utils.standardPromise(verses_endpoints.getVerses, {
    return_type: return_type
  }, params);
};

function getVerse(version_id, book_id, chapter_number, verse_number, params) {
  var return_type = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : "js";

  return utils.standardPromise(verses_endpoints.getVerse, {
    version_id: version_id,
    book_id: book_id,
    chapter_number: chapter_number,
    verse_number: verse_number,
    return_type: return_type
  }, params);
};

module.exports = verses_api;