var CHANGE_FIXTURE = 'CHANGE_FIXTURE';

module.exports = {
  type: CHANGE_FIXTURE,

  changeFixture: function(data) {
    return {
      type: CHANGE_FIXTURE,
      data: data
    };
  }
}
