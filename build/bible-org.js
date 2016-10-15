'use strict';

var books = require('./api/books.api.js');
var bookgroups = require('./api/bookgroups.api.js');
var chapters = require('./api/chapters.api.js');
var passages = require('./api/passages.api.js');
var verses = require('./api/verses.api.js');
var versions = require('./api/versions.api.js');

var bible_org = {
  books: books,
  bookgroups: bookgroups,
  chapters: chapters,
  passages: passages,
  verses: verses,
  versions: versions
};

module.exports = bible_org;