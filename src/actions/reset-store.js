var RESET_STORE = 'RESET_STORE';

module.exports = {
  type: RESET_STORE,

  resetStore: function(reduxStore) {
    return {
      type: RESET_STORE,
      reduxStore: reduxStore
    };
  }
};
