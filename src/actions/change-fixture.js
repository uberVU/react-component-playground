var CHANGE_FIXTURE = 'CHANGE_FIXTURE';

module.exports = {
  type: CHANGE_FIXTURE,

  changeFixture: function(fixture) {
    return {
      type: CHANGE_FIXTURE,
      fixture: fixture
    };
  }
}
