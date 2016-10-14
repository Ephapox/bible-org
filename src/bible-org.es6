const request = require('request');

const endpoints = require('./endpoints.js');
const utils = require('./utils.js');

const bible_org = {
  getAllVersions: getAllVersions,
  getVersionsByLanguage: getVersionsByLanguage,
  getVersionInfo: getVersionInfo,

  getAllBooksByVersion: getAllBooksByVersion,
  getBookByVersion: getBookByVersion,
  getBookChapters: getBookChapters,
  getBookChapter: getBookChapter,

  getChapterVerses: getChapterVerses
};

function getAllVersions() {
  return new Promise((resolve, reject) => {
    request(endpoints.getAllVersions, (error, response, body) => {
      utils.standardGet(error, body, resolve, reject);
    });
  });
};

function getAllBooksByVersion(version_id, params) {
  return new Promise((resolve, reject) => {
    let compiledUrl = endpoints.getAllBooksByVersion({
      "version_id": version_id
    });
    compiledUrl = utils.addParams(compiledUrl, params);

    request(compiledUrl, (error, response, body) => {
      const parsedBody = utils.standardGet(error, body);
      if(parsedBody.error) return reject(parsedBody);
     
      return resolve(parsedBody);
    });
  });
};

function getVersionsByLanguage(language) {
  return new Promise((resolve, reject) => {
    const compiledUrl = endpoints.getVersionsByLanguage({
      "language": language
    });

    request(compiledUrl, (error, response, body) => {
      const parsedBody = utils.standardGet(error, body);
      if(parsedBody.error) return reject(parsedBody);

      return resolve(parsedBody);
    });
  });
};

function getVersionInfo(version_id) {
  return new Promise((resolve, reject) => {
    const compiledUrl = endpoints.getVersionInfo({
      "version_id": version_id
    });

    request(compiledUrl, (error, response, body) => {
      utils.standardGet(error, body, resolve, reject);
    });
  });
};

function getBookByVersion(version_id, book_name) {
  return new Promise((resolve, reject) => {
    const compiledUrl = endpoints.getBookByVersion({
      version_id: version_id,
      book_name: book_name
    });

    request(compiledUrl, (error, response, body) => {
      utils.standardGet(error, body, resolve, reject);
    });
  }); 
};

function getBookChapters(version_id, book_name, params) {
  return new Promise((resolve, reject) => {
    let compiledUrl = endpoints.getBookChapters({
      "version_id": version_id,
      "book_name": book_name
    });

    compiledUrl = utils.addParams(compiledUrl, params);

    request(compiledUrl, (error, response, body) => {
      utils.standardGet(error, body, resolve, reject);
    });
  });
};

function getBookChapter(version_id, book_name, chapter, params) {
  return new Promise((resolve, reject) => {
    let compiledUrl = endpoints.getBookChapter({
      "version_id": version_id,
      "book_name": book_name,
      "chapter": chapter
    });

    compiledUrl = utils.addParams(compiledUrl, params);

    request(compiledUrl, (error, response, body) => {
      utils.standardGet(error, body, resolve, reject);
    });
  });
};

function getChapterVerses(version_id, book_name, chapter, params) {
  return new Promise((resolve, reject) => {
    let compiledUrl = endpoints.getChapterVerses({
      "version_id": version_id,
      "book_name": book_name,
      "chapter": chapter
    });

    compiledUrl = utils.addParams(compiledUrl, params);

    request(compiledUrl, (error, response, body) => {
      utils.standardGet(error, body, resolve, reject);
    });
  });
};


module.exports = bible_org;
