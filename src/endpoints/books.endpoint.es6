const _ = require('lodash');

module.exports = {
  getAllBooks: _.template('/versions/<%= version_id %>/books.<%= return_type %>'),
  getAllBooksByBookgroups: _.template('/bookgroups/<%= group_id %>/books.<%= return_type %>'),
  getBook: _.template('/books/<%= version_id %>.<%= book_name %>.<%= return_type %>')
};
