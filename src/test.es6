const test = require('ava');
const _ = require('lodash');

const CONFIG = require('./../config.js');
const bible = require('./bible-org.js');
const endpoints = require('./endpoints.js');
const utils = require('./utils.js');

const versions_api = require('./api/versions.api.js');
const books_api = require('./api/books.api.js');

test.beforeEach(t => {
  t.context.version_id = "eng-ESV";
  t.context.book_name = "Rev";
  t.context.language = "eng-US";
  t.context.group_id = "3";
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
  return books_api.getBook(t.context.version_id, t.context.book_name).then(
    body => {
      t.true(body.response.books.length === 1);
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


/*
 * Promise tests
 */
test('[Promise] getChapterVerses returns all verses for a chapter', t => {
  return bible.getChapterVerses(t.context.version_id, t.context.book_name, 50)
  .then(
    body => {
      t.true(body.response.verses.length === 26);
    },
    reject => {
      t.true(reject.hasOwnProperty('error'), "no error property for reject promise."); 
    }
  );
});

test('[Promise] getBookChapter resolves with a single chapter', t => {
  return bible.getBookChapter(t.context.version_id, t.context.book_name, 5)
  .then(
    body => {
      t.true(body.response.chapters.length === 1);
    },
    reject => {
      t.true(reject.hasOwnProperty('error'), "no error property for reject promise."); 
    }
  );
});
  
test('[Promise] getBookChapters resolves with all chapters for a book', t => {
  return bible.getBookChapters(t.context.version_id, t.context.book_name)
  .then(
    body => {
      t.true(body.response.chapters.length === 50); 
    },
    reject => {
      t.true(reject.hasOwnProperty('error'), "no error property for reject promise."); 
    }
  );
});

test('[Promise] getAllVersions resolves with response with versions array with length > 0 or rejects with error', t => {
  return bible.getAllVersions().then(
    body => {
      const versionLength = body.response.versions.length;
      t.true(versionLength > 0, "no versions array on response body.");
    },
    reject => {
      t.true(reject.hasOwnProperty('error'), "no error property for reject promise."); 
    }
  );
}); 


test('[Promise] getVersionsByLanguage resolves with response with specified language versions or rejects with error', t => {
  const language = "spa";
  return bible.getVersionsByLanguage(language).then(
    body => {
      const versionsLength = body.response.versions.length;
      const langArray = _.map(body.response.versions, 'lang');

      t.true(versionsLength === langArray.length, `There are ${langArray.length} ${language} language versions found in the filtered response but ${versionsLength} in the original response.`)
    },
    reject => {
      t.true(reject.hasOwnProperty('error'), "no error property for reject promise."); 
    }
  );
});

test('[Promise] getVersionInfo resolves with response that has one version or rejects with error', t => {
  const version_id = "eng-ESV";

  return bible.getVersionInfo(version_id).then(
    body => {
      const versions = body.response.versions;
      t.true(versions.length === 1, `There are ${versions.length} versions in the versions array, there should be 1.`);
    },
    reject => {
      t.true(reject.hasOwnProperty('error'), "no error property for reject promise."); 
    }
  );
});

test('[Promise] getAllBooksByVersion accepts include_chapters param that returns the correct number of chapters.', t => {
  const version_id = "eng-ESV";
  const total_chapters = 1189;

  return bible.getAllBooksByVersion(version_id, {
    include_chapters: "true"
  })
  .then(
    body => {
      const total_chapters_sum = _.chain(body.response.books)
                                  .map('chapters')
                                  .map(_.last)
                                  .flatMap('chapter')
                                  .map(_.toInteger)
                                  .sum()
                                  .value();

      t.true(total_chapters_sum === total_chapters, `calculated total is ${total_chapters_sum} but should be ${total_chapters}`);
    },
    reject => {
      t.true(reject.hasOwnProperty('error'), "no error property for reject promise."); 
    }
  );
});

test('[Promise] getAllBooksByVersion accepts testament param', t => {
  const version_id = "eng-ESV";

  return bible.getAllBooksByVersion(version_id, {
    testament: "NT"
  })
  .then(
    body => {
      t.true(body.response.hasOwnProperty('books'));
    },
    reject => {
      t.true(reject.hasOwnProperty('error'), "no error property for reject promise."); 
    }
  );
});

test('[Proimse] getBookByVersion returns individual books based on OSIS normative book abbreviation.', t => {
  return bible.getBookByVersion(t.context.version_id, "Rev")
  .then(
    body => {
      t.true(body.response.books.length === 1);
    },
    reject => {
      t.true(reject.hasOwnProperty('error'), "no error property for reject promise."); 
    }
  );
});
