const _ = require('lodash');
const CONFIG = require('./../config.js');

const request = require('request');

module.exports = {
  adder: function adder(...y) {
    return y.reduce((acc, num) => acc += num ,0);
  }
}
