var _ = require('lodash'),
    fixture = require('./selected-fixture-with-search.js');

module.exports = _.merge({}, fixture, {
  state: {
    searchText: 'foobar'
  }
});
