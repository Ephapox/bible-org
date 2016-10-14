const test = require('ava');
const _ = require('lodash');

const utils = require('./utils.js');

const versions_api = require('./api/versions.api.js');
const books_api = require('./api/books.api.js');
const bookgroups_api = require('./api/bookgroups.api.js');
const passages_api = require('./api/passages.api.js');
const search_api = require('./api/search.api.js');
const verses_api = require('./api/verses.api.js');
const chapters_api = require('./api/chapters.api.js');

test.beforeEach(t => {
  t.context.version_id = "eng-ESV";
  t.context.book_id = "Rev";
  t.context.language = "eng-US";
  t.context.group_id = "3";
  t.context.bookgroup_id = "1";
  t.context.chapter_number = "1";
  t.context.verse_number = "4";
});

test('versions_api.getAllVersions', t => {
  return versions_api.getAllVersions().then(
    body => {
      t.true(body.response.versions.length > 0, `There should be > 0 versions but instead found ${body}`);
    },
    error => {
      t.fail(`Request failed but handled: ${error}`);
    }
  );
});

test('versions_api.getVersionInfo', t => {
  return versions_api.getVersionInfo(t.context.version_id).then(
    body => {
      t.plan(2);
      t.true(body.response.versions.length === 1);
      t.true(body.response.versions[0].id === t.context.version_id);
    },
    error => {
      t.fail(`Request failed but handled: ${error}`);
    }
  );
});

test('books_api.getAllBooks', t => {
  return books_api.getAllBooks(
    t.context.version_id,
    {
      include_chapters: true
    }
  ).then(
    body => {
      t.plan(2);
      t.true(body.response.books.length === 66);
      t.true(body.response.books[0].hasOwnProperty('chapters'));
    },
    error => {
      t.fail(`Request failed but handled: ${error}`);
    }
  );
});

test('books_api.getAllBooksByBookgroups', t => {
  return books_api.getAllBooksByBookgroups(t.context.group_id).then(
    body => {
      t.true(body.response.books.length > 0);
    },
    error => {
      t.fail(`Request failed but handled: ${error}`);
    }
  );
});

test('books_api.getBook', t => {
  return books_api.getBook(t.context.version_id, t.context.book_id).then(
    body => {
      t.true(body.response.books.length === 1);
    },
    error => {
      t.fail(`Request failed but handled: ${error}`);
    }
  );
});

test('bookgroups_api.getAllBookgroups', t => {
  return bookgroups_api.getAllBookgroups().then(
    body => {
      t.true(body.response.bookgroups.length > 0);
    },
    error => {
      t.fail(`Request failed but handled: ${error}`);
    }
  );
});

test('bookgroups_api.getBookgroup', t => {
  return bookgroups_api.getBookgroup(t.context.bookgroup_id).then(
    body => {
      t.true(body.response.bookgroups.length === 1);
      t.true(body.response.bookgroups[0].id === "1");
    },
    error => {
      t.fail(`Request failed but handled: ${error}`);
    }
  );
});

test('chapters_api.getAllBookChapters', t => {
  return chapters_api.getAllBookChapters(t.context.version_id, t.context.book_id).then(
    body => {
      t.true(body.response.chapters.length === 22);
    },
    error => {
      t.fail(`Request failed but handled: ${error}`);
    }
  );
});

test('chapters_api.getBookChapter', t => {
  return chapters_api.getBookChapter(t.context.version_id, t.context.book_id, t.context.chapter_number).then(
    body => {
      t.true(body.response.chapters.length === 1);
    },
    error => {
      t.fail(`Request failed but handled: ${error}`);
    }
  );
});

test('passages_api.getPassages', t => {
  return passages_api.getPassages({
    "q[]": ["john 3:1-5", "Proverbs 21:1-2"],
    "version": [t.context.version_id]
  }).then(
    body => {
      t.true(body.response.search.result.passages.length === 2);
    },
    error => {
      t.fail(`Request failed but handled: ${error}`);
    }
  );
});

test('verses_api.getAllChapterVerses', t => {
  return verses_api.getAllChapterVerses(
    t.context.version_id,
    t.context.book_id,
    t.context.chapter_number,
    {}
  ).then(
    body => {
      t.true(body.response.verses.length === 20);
    },
    error => {
      t.fail(`Request failed but handled: ${error}`);
    }
  );
});

test('verses_api.getAllChapterVerses with start/end params', t => {
  return verses_api.getAllChapterVerses(
    t.context.version_id,
    t.context.book_id,
    t.context.chapter_number,
    {
      "start": 4,
      "end": 8
    }
  ).then(
    body => {
      t.true(body.response.verses.length === 5);
    },
    error => {
      t.fail(`Request failed but handled: ${error}`);
    }
  );
});

test('verses_api.getVerses', t => {
  return verses_api.getVerses(
    {
      "keyword": "Theophilus"
    }
  ).then(
    body => {
      t.true(body.response.search.result.summary.total === body.response.search.result.verses.length)
    },
    error => {
      t.fail(`Request failed but handled: ${error}`);
    }
  );
});

test('verses_api.getVerse', t => {
  return verses_api.getVerse(
    t.context.version_id,
    t.context.book_id,
    t.context.chapter_number,
    t.context.verse_number
  ).then(
    body => {
      t.plan(2);
      t.true(body.response.verses.length > 0);
      t.true(body.response.verses[0].verse === "4");
    },
    error => {
      t.fail(`Request failed but handled: ${error}`);
    }
  );
});

test('addParams util adds params to url', t => {
  t.plan(4);

  const urlTest1 = 'https://google.com/hello/world?hello=world';
  const urlTest2 = 'https://yahoo.com/hello?q=dude&key=value';
  const urlTest3 = 'https://facebook.com/dude?q=dude&hello=wow&keys=value';
  const urlTest4 = 'https://airbnb.com?q=1&r=2&world=true&doge=false';

  let url1 = 'https://google.com/hello/world';
  let url2 = 'https://yahoo.com/hello?q=dude';
  let url3 = 'https://facebook.com/dude?q=dude&hello=wow';
  let url4 = 'https://airbnb.com';

  const addedUrl1 = utils.addParams(url1, {
    hello: "world" 
  });
  const addedUrl2 = utils.addParams(url2, {
    key: "value"
  });
  const addedUrl3 = utils.addParams(url3, {
    keys: "value"
  });
  const addedUrl4 = utils.addParams(url4, {
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
