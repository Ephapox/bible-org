'use strict';

var _ = require('lodash');
var books = require('./api/books.api.js');
var bookgroups = require('./api/bookgroups.api.js');
var chapters = require('./api/chapters.api.js');
var passages = require('./api/passages.api.js');
var verses = require('./api/verses.api.js');
var versions = require('./api/versions.api.js');
var apiConfig = require('./../api.config.js');

var bible_org = {
  books: books,
  bookgroups: bookgroups,
  chapters: chapters,
  passages: passages,
  verses: verses,
  versions: versions,
  setKey: setKey
};

function setKey(key) {
  apiConfig["url"] = 'https://' + key + ':X@bibles.org/v2';
};

module.exports = bible_org;