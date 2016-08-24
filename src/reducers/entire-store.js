var CHANGE_FIXTURE = require('../actions/change-fixture.js').type,
    RESET_STORE = require('../actions/reset-store.js').type,
    _ = require('lodash');

module.exports = function(state, action) {
  if (typeof state === 'undefined') {
    return {};
  }

  switch (action.type) {
    case CHANGE_FIXTURE:
      if (action.fixture && action.fixture.reduxStore) {
        return _.merge({}, state, action.fixture.reduxStore);
      }
      return state;
    case RESET_STORE:
      return action.reduxStore;
    default:
      return state;
  }
};
