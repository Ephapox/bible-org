const test = require('ava');
const app = require('./app.js');

test('foo', t => {
  t.pass();
});

test('adder', t => {
  t.is(10, app.adder(1,1,8));
});
