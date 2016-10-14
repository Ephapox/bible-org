const request = require('request');

const verses_endpoints = require('./../endpoints/verses.endpoint.js');
const utils = require('./../utils.js');

const verses_api = {
  getAllChapterVerses: getAllChapterVerses,
  getVerses: getVerses,
  getVerse: getVerse
};

function getAllChapterVerses(version_id, book_id, chapter_number, params, return_type="js") {
  return utils.standardPromise(
    verses_endpoints.getAllChapterVerses,
    {
      version_id: version_id,
      book_id: book_id,
      chapter_number: chapter_number,
      return_type: return_type 
    },
    params
  );
};

function getVerses(params, return_type="js") {
  return utils.standardPromise(
    verses_endpoints.getVerses,
    {
      return_type: return_type 
    },
    params
  );
};

function getVerse(version_id, book_id, chapter_number, verse_number, params, return_type="js") {
  return utils.standardPromise(
    verses_endpoints.getVerse,
    {
      version_id: version_id,
      book_id: book_id,
      chapter_number: chapter_number,
      verse_number: verse_number,
      return_type: return_type
    },
    params
  );
};

module.exports = verses_api;
