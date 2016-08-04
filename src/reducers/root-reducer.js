var changeFixture = require('./change-fixture.js'),
    redux = require('redux');

module.exports = redux.combineReducers({changeFixture : changeFixture});
