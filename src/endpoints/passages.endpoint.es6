const _ = require('lodash');

module.exports = {
  getPassages: _.template("/passages.<%= return_type %>"),
};
