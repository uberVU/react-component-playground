describe('Reset store actions', function() {
  var resetStore = require('src/actions/reset-store.js');

  it('should create the correct action', function() {
    var reduxStore = {id: 1, name: 'John'};
    var expectedAction = {
      type: resetStore.type,
      reduxStore: reduxStore
    };

    expect(resetStore.resetStore(reduxStore)).to.deep.equal(expectedAction);
  });
});
