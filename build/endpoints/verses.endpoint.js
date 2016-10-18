'use strict';

var _ = require('lodash');

module.exports = {
  getAllChapterVerses: _.template('/chapters/<%= version_id %>:<%= book_id %>.<%=chapter_number %>/verses.<%= return_type %>'),
  getVerses: _.template('/verses.<%= return_type %>'),
  getVerse: _.template('/verses/<%= version_id %>:<%= book_id %>.<%= chapter_number %>.<%= verse_number %>.<%= return_type %>')
};