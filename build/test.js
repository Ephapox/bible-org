'use strict';

var test = require('ava');
var _ = require('lodash');

var utils = require('./utils.js');

var versions_api = require('./api/versions.api.js');
var books_api = require('./api/books.api.js');
var bookgroups_api = require('./api/bookgroups.api.js');
var passages_api = require('./api/passages.api.js');
var search_api = require('./api/search.api.js');
var verses_api = require('./api/verses.api.js');
var chapters_api = require('./api/chapters.api.js');

test.beforeEach(function (t) {
  t.context.version_id = "eng-ESV";
  t.context.book_id = "Rev";
  t.context.language = "eng-US";
  t.context.group_id = "3";
  t.context.bookgroup_id = "1";
  t.context.chapter_number = "1";
  t.context.verse_number = "4";
});

test('versions_api.getAllVersions', function (t) {
  return versions_api.getAllVersions().then(function (body) {
    t.true(body.response.versions.length > 0, 'There should be > 0 versions but instead found ' + body);
  }, function (error) {
    t.fail('Request failed but handled: ' + error);
  });
});

test('versions_api.getVersionInfo', function (t) {
  return versions_api.getVersionInfo(t.context.version_id).then(function (body) {
    t.plan(2);
    t.true(body.response.versions.length === 1);
    t.true(body.response.versions[0].id === t.context.version_id);
  }, function (error) {
    t.fail('Request failed but handled: ' + error);
  });
});

test('books_api.getAllBooks', function (t) {
  return books_api.getAllBooks(t.context.version_id, {
    include_chapters: true
  }).then(function (body) {
    t.plan(2);
    t.true(body.response.books.length === 66);
    t.true(body.response.books[0].hasOwnProperty('chapters'));
  }, function (error) {
    t.fail('Request failed but handled: ' + error);
  });
});

test('books_api.getAllBooksByBookgroups', function (t) {
  return books_api.getAllBooksByBookgroups(t.context.group_id).then(function (body) {
    t.true(body.response.books.length > 0);
  }, function (error) {
    t.fail('Request failed but handled: ' + error);
  });
});

test('books_api.getBook', function (t) {
  return books_api.getBook(t.context.version_id, t.context.book_id).then(function (body) {
    t.true(body.response.books.length === 1);
  }, function (error) {
    t.fail('Request failed but handled: ' + error);
  });
});

test('bookgroups_api.getAllBookgroups', function (t) {
  return bookgroups_api.getAllBookgroups().then(function (body) {
    t.true(body.response.bookgroups.length > 0);
  }, function (error) {
    t.fail('Request failed but handled: ' + error);
  });
});

test('bookgroups_api.getBookgroup', function (t) {
  return bookgroups_api.getBookgroup(t.context.bookgroup_id).then(function (body) {
    t.true(body.response.bookgroups.length === 1);
    t.true(body.response.bookgroups[0].id === "1");
  }, function (error) {
    t.fail('Request failed but handled: ' + error);
  });
});

test('chapters_api.getAllBookChapters', function (t) {
  return chapters_api.getAllBookChapters(t.context.version_id, t.context.book_id).then(function (body) {
    t.true(body.response.chapters.length === 22);
  }, function (error) {
    t.fail('Request failed but handled: ' + error);
  });
});

test('chapters_api.getBookChapter', function (t) {
  return chapters_api.getBookChapter(t.context.version_id, t.context.book_id, t.context.chapter_number).then(function (body) {
    t.true(body.response.chapters.length === 1);
  }, function (error) {
    t.fail('Request failed but handled: ' + error);
  });
});

test('passages_api.getPassages', function (t) {
  return passages_api.getPassages({
    "q[]": ["john 3:1-5", "Proverbs 21:1-2"],
    "version": [t.context.version_id]
  }).then(function (body) {
    t.true(body.response.search.result.passages.length === 2);
  }, function (error) {
    t.fail('Request failed but handled: ' + error);
  });
});

test('verses_api.getAllChapterVerses', function (t) {
  return verses_api.getAllChapterVerses(t.context.version_id, t.context.book_id, t.context.chapter_number, {}).then(function (body) {
    t.true(body.response.verses.length === 20);
  }, function (error) {
    t.fail('Request failed but handled: ' + error);
  });
});

test('verses_api.getAllChapterVerses with start/end params', function (t) {
  return verses_api.getAllChapterVerses(t.context.version_id, t.context.book_id, t.context.chapter_number, {
    "start": 4,
    "end": 8
  }).then(function (body) {
    t.true(body.response.verses.length === 5);
  }, function (error) {
    t.fail('Request failed but handled: ' + error);
  });
});

test('verses_api.getVerses', function (t) {
  return verses_api.getVerses({
    "keyword": "Theophilus"
  }).then(function (body) {
    t.true(body.response.search.result.summary.total === body.response.search.result.verses.length);
  }, function (error) {
    t.fail('Request failed but handled: ' + error);
  });
});

test('verses_api.getVerse', function (t) {
  return verses_api.getVerse(t.context.version_id, t.context.book_id, t.context.chapter_number, t.context.verse_number).then(function (body) {
    t.plan(2);
    t.true(body.response.verses.length > 0);
    t.true(body.response.verses[0].verse === "4");
  }, function (error) {
    t.fail('Request failed but handled: ' + error);
  });
});

test('addParams util adds params to url', function (t) {
  t.plan(4);

  var urlTest1 = 'https://google.com/hello/world?hello=world';
  var urlTest2 = 'https://yahoo.com/hello?q=dude&key=value';
  var urlTest3 = 'https://facebook.com/dude?q=dude&hello=wow&keys=value';
  var urlTest4 = 'https://airbnb.com?q=1&r=2&world=true&doge=false';

  var url1 = 'https://google.com/hello/world';
  var url2 = 'https://yahoo.com/hello?q=dude';
  var url3 = 'https://facebook.com/dude?q=dude&hello=wow';
  var url4 = 'https://airbnb.com';

  var addedUrl1 = utils.addParams(url1, {
    hello: "world"
  });
  var addedUrl2 = utils.addParams(url2, {
    key: "value"
  });
  var addedUrl3 = utils.addParams(url3, {
    keys: "value"
  });
  var addedUrl4 = utils.addParams(url4, {
    q: "1",
    r: "2",
    world: "true",
    doge: "false"
  });

  t.true(urlTest1 === addedUrl1);
  t.true(urlTest2 === addedUrl2);
  t.true(urlTest3 === addedUrl3);
  t.true(urlTest4 === addedUrl4);
});