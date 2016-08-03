describe('Change fixture actions', function() {
  var changeFixture = require('src/actions/change-fixture.js');

  it('should create the correct action', function() {
    var data = {id: 1, name: 'John'};
    var expectedAction = {
      type: changeFixture.type,
      data: data
    };

    expect(changeFixture.changeFixture(data)).to.deep.equal(expectedAction);
  });
});
