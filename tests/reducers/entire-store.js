var reducer = require('src/reducers/entire-store.js');
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
      fixture: {
        reduxStore: {
          id: 1,
          name: 'John'
        }
      }
    };

    expect(reducer({}, action)).to.deep.equal(expectedState);
  });

  it('should return empty state on undefined fixture', function() {
    var initialState = {
      reduxStore: {
        id: 1,
        name: 'John'
      }
    };

    var action = {
      type: CHANGE_FIXTURE
    };

    expect(reducer(initialState, action)).to.be.empty;
  });

  it('should maintain state when receiving an unknown action', function() {
    var initialState = {
      reduxStore: {
        id: 1,
        name: 'John'
      }
    };

    expect(reducer(initialState, {type: 'unknown'}))
      .to.deep.equal(initialState);
  });
});
