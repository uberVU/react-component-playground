var entireStore = require('./entire-store.js'),
    redux = require('redux');

module.exports = redux.combineReducers({entireStore: entireStore});
