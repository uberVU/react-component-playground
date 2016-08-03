var CHANGE_FIXTURE = require('../actions/change-fixture.js').type;

module.exports = function(state = {}, action) {
  switch (action.type) {
    case CHANGE_FIXTURE:
      return action.data || {};
    default:
      return state;
  }
}
