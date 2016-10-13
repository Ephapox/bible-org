const _ = require('lodash');

const CONFIG = require('./../config.js');
const URL = `https://${CONFIG.BIBLE_ORG_KEY}:X@bibles.org/v2`;

module.exports = {
  // all versions
  getAllVersions: URL + "/versions.js",
  // list of books for a version id
    // params
      // include_chapters (true/false) - chapter info for books
      // testament (NT/OT/DEUT) - books by testament
  getAllBooksByVersion: _.template(URL + "/versions/<%= version_id %>/books.js"),
  // list of versions for a ISO 639-2 language parameter
  getVersionsByLanguage: _.template(URL + "/versions.js?language=<%= language %>"),
  // info for a version ID
  getVersionInfo: _.template(URL + "/versions/<%= version_id %>"),
  getBookByVersion: _.template(URL + "/books/<%= version_id %>:<%= book_name %>.js"),

  search: {
    
  }
};
