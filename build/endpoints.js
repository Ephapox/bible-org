'use strict';

var _ = require('lodash');

var CONFIG = require('./../config.js');
var URL = 'https://' + CONFIG.BIBLE_ORG_KEY + ':X@bibles.org/v2';

module.exports = {
  // all versions
  getAllVersions: URL + "/versions.js",
  // list of versions for a ISO 639-2 language parameter
  getVersionsByLanguage: _.template(URL + "/versions.js?language=<%= language %>"),
  // info for a version ID
  getVersionInfo: _.template(URL + "/versions/<%= version_id %>"),

  // list of books for a version id
  // params
  // include_chapters (true/false) - chapter info for books
  // testament (NT/OT/DEUT) - books by testament
  getAllBooksByVersion: _.template(URL + "/versions/<%= version_id %>/books.js"),
  getBookByVersion: _.template(URL + "/books/<%= version_id %>:<%= book_name %>.js"),
  // Params
  // include_marginalia (true/false) - Adds footnotes/cf's
  getBookChapters: _.template(URL + "/books/<%= version_id %>:<%= book_name %>/chapters.js"),
  // Params
  // include_marginalia (true/false) - Adds footnotes/cf's
  getBookChapter: _.template(URL + "/chapters/<%= version_id %>:<%= book_name %>.<%= chapter %>.js"),
  // Params
  // include_marginalia (true/false) - Adds footnotes/cf's
  // start (number) - Start verse
  // end (number) - End verse
  getChapterVerses: _.template(URL + "/chapters/<%= version_id %>:<%= book_name %>.<%= chapter %>/verses.js"),
  // Params
  //  keyword(required) (string) - words to search
  //  precision (all/any) - the precision of the search
  //  exclude (string) - keywords that should be appear in the search
  //  spelling (yes) - searches using terms that are like the keywords
  //  version (version values) - can be any version values
  //  language (language values) - can be any language values
  //  testament (testament values) - can be any testament values
  //  book (book values)
  //  sort_order (canonical/relevance)
  //  offset (number)
  //  limit (number)
  getVerses: _.template(URL + "/verses.js"),
  getVerse: _.template(URL + "/verses/<%= version_id %>:<%= book_name %>.<%= chapter %><%= verse %>.js"),
  // Params
  //  q[] (passage_specifer) - Can be ranges and multiple specifiers
  //  version - Can be multiple versions
  getPassage: _.template(URL + "/passages.js"),
  // All book groups (ex: pentateuch, wisdom, history, gospel...)
  getBooksInBookGroup: _.template(URL + "/booksgroups/<%= group_id %>/books.js"),
  getBookGroups: _.template(URL + "/bookgroups.js"),
  getBookGroup: _.template(URL + "/bookgroups/<%= bookgroup_id %>.js"),
  search: {}
};