const _ = require('lodash');
const CONFIG = require('./../../config.js');

const URL = CONFIG.URL;

module.exports = {
  getAllChapterVerses: _.template(URL + '/chapters/<%= version_id %>:<%= book_id %>.<%=chapter_number %>/verses.<%= return_type %>'),
  getVerses: _.template(URL + '/verses.<%= return_type %>'),
  getVerse: _.template(URL + '/verses/<%= version_id %>:<%= book_id %>.<%= chapter_number %>.<%= verse_number %>.<%= return_type %>')
};
