const chapters_endpoints = require('./../endpoints/chapters.endpoint.js');
const utils = require('./../utils.js');

const chapters_api = {
  getAllBookChapters: getAllBookChapters,
  getBookChapter: getBookChapter
};

function getAllBookChapters(version_id, book_id, return_type="js") {
  return utils.standardPromise(
    chapters_endpoints.getAllBookChapters,
    {
      version_id: version_id,
      book_id: book_id,
      return_type: return_type
    }
  );
};

function getBookChapter(version_id, book_id, chapter_number, return_type="js") {
  return utils.standardPromise(
    chapters_endpoints.getBookChapter,
    {
      version_id: version_id,
      book_id: book_id,
      chapter_number: chapter_number,
      return_type: return_type
    }
  );
};

module.exports = chapters_api;
