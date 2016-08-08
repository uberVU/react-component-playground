var redux = require('redux'),
    thunk = require('redux-thunk').default,
    reducer = require('../reducers/root-reducer.js');

module.exports = function() {
  return redux.createStore(reducer, {}, redux.applyMiddleware(thunk));
};
