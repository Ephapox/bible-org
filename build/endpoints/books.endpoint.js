'use strict';

var _ = require('lodash');
var CONFIG = require('./../../config.js');

var URL = CONFIG.URL;

module.exports = {
  getAllBooks: _.template(URL + '/versions/<%= version_id %>/books.<%= return_type %>'),
  getAllBooksByBookgroups: _.template(URL + '/bookgroups/<%= group_id %>/books.<%= return_type %>'),
  getBook: _.template(URL + '/books/<%= version_id %>.<%= book_name %>.<%= return_type %>')
};