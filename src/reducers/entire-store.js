var CHANGE_FIXTURE = require('../actions/change-fixture.js').type;

module.exports = function(state, action) {
  if (typeof state === 'undefined') {
    return {};
  }

  switch (action.type) {
    case CHANGE_FIXTURE:
      if (action.fixture && action.fixture.reduxStore) {
        return action.fixture.reduxStore;
      }
      return {};
    default:
      return state;
  }
};
