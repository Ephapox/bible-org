'use strict';

var _ = require('lodash');
var CONFIG = require('./../../config.js');

var URL = CONFIG.URL;

module.exports = {
  getAllBookChapters: _.template(URL + "/books/<%= version_id %>:<%= book_id %>/chapters.<%= return_type %>"),
  getBookChapter: _.template(URL + "/chapters/<%= version_id %>:<%= book_id %>.<%= chapter_number %>.<%= return_type %>")
};