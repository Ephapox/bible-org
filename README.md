# ABS Bible Search API JavaScript Wrapper

Almost done. Work still in progress.

JavaScript wrapper for the [ABS Bible Seach API](https://bibles.org/pages/api/documentation/)
### Updates
10/14/2016

The following endpoints are not working, there is an issue with the API.
```
getAllBooksByBookgroups(group_id, params{}, return_type="js")
    => GET /bookgroups/#{group_id}/books.js
getBook(version_id, book_name, params{}, return_type="js")
    => GET /books/#{version_id}:#{book_name}.js
```
### Install
[npm](https://github.com/npm/npm)
```
npm install bible-org-api
```
[yarn](https://github.com/yarnpkg/yarn)
```
yarn add bible-org-api
```
### Run Tests
```
npm test
```
### Endpoints
* GET /versions.js
* GET /versions/#{version_id}.js
* GET /versions/#{version_id}/books.js
* GET /bookgroups/#{group_id}/books.js
* GET /books/#{version_id}:#{book_name}.js
* GET /books/#{version_id}:#{book_id}/chapters.js
* GET /chapters/#{version_id}:#{book_id}.#{chapter_number}.js
* GET /chapters/#{version_id}:#{book_id}.#{chapter_number}/verses.js
* GET /verses.js
* GET /verses/#{version_id}:#{book_id}.#{chapter_number}.#{verse_number}.js
* GET /passages.js?q[]=#{passage_specifier_list}
* GET /bookgroups.js
* GET /bookgroups/#{bookgroup_id}.js

### Method Endpoint Mapping
```javascript
var Bible = require('bible-org');

Bible.getAllVersions(params{}, return_type="js") 
    =>  GET /versions.js
    
Bible.getVersionInfo(version_id, params{}, return_type="js") 
    => GET /versions/#{version_id}/books.js
    
Bible.getAllBookgroups(return_type="js")
    => GET /bookgroups.js
    
Bible.getBookgroup(bookgroup_id, return_type="js")
    => GET /bookgroups/#{bookgroup_id}.js
    
Bible.getAllBooks(version_id, params{}, return_type="js")
    => GET /versions/#{version_id}/books.js
    
// CURRENTLY NOT WORKING
Bible.getAllBooksByBookgroups(group_id, params{}, return_type="js")
    => GET /bookgroups/#{group_id}/books.js
    
// CURRENTLY NOT WORKING
Bible.getBook(version_id, book_name, params{}, return_type="js")
    => GET /books/#{version_id}:#{book_name}.js
    
Bible.getAllBookChapters(version_id, book_id, return_type="js")
    => GET /books/#{version_id}:#{book_id}/chapters.js
    
Bible.getBookChapter(version_id, book_id, chapter_number, return_type="js")
    => GET /chapters/#{version_id}:#{book_id}.#{chapter_number}/verses.js

```


