var FIXTURE = 'search-without-results';

describe(`ComponentPlayground (${FIXTURE}) Events Handlers`, function() {
  var render = require('tests/lib/render-component.js'),
      fixture = require(`fixtures/component-playground/${FIXTURE}.js`);

  var component;

  beforeEach(function() {
    ({component} = render(fixture));
  });

  it('should not render any components based on search value', function() {
    expect(component._getFilteredFixtures()).to.be.empty;
  });
});
