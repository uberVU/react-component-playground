var reducer = require('src/reducers/change-fixture.js');
var CHANGE_FIXTURE = require('src/actions/change-fixture.js').type;

describe('Change fixture reducer', function() {
  it('should return the initial state', function() {
    expect(reducer(undefined, {})).to.be.empty;
  });

  it('should update state with received data', function() {
    var expectedState = {
      id: 1,
      name: 'John'
    };

    var action = {
      type: CHANGE_FIXTURE,
      data: expectedState
    };

    expect(reducer({}, action)).to.deep.equal(expectedState);
  });

  it('should return empty state on undefined data', function() {
    var initialState = {
      id: 1,
      name: 'John'
    };

    var action = {
      type: CHANGE_FIXTURE
    };
    expect(reducer(initialState, action)).to.be.empty;
  });
});
