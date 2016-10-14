const books = require('./api/books.api.js');
const bookgroups = require('./api/bookgroups.api.js');
const chapters = require('./api/chapters.api.js');
const passages = require('./api/passages.api.js');
const verses = require('./api/verses.api.js');
const versions = require('./api/versions.api.js');

const bible_org = {
  books: books,
  bookgroups: bookgroups,
  chapters: chapters,
  passages: passages,
  verses: verses,
  versions: versions
};

module.exports = bible_org;
