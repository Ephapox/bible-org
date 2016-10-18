"use strict";

var _ = require('lodash');

module.exports = {
  getAllBookChapters: _.template("/books/<%= version_id %>:<%= book_id %>/chapters.<%= return_type %>"),
  getBookChapter: _.template("/chapters/<%= version_id %>:<%= book_id %>.<%= chapter_number %>.<%= return_type %>")
};