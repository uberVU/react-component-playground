describe('Change fixture actions', function() {
  var changeFixture = require('src/actions/change-fixture.js');

  it('should create the correct action', function() {
    var fixture = {reduxStore: {id: 1, name: 'John'}};
    var expectedAction = {
      type: changeFixture.type,
      fixture: fixture
    };

    expect(changeFixture.changeFixture(fixture)).to.deep.equal(expectedAction);
  });
});
