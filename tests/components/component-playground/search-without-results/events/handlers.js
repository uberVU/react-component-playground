var FIXTURE = 'search-without-results';

describe(`ComponentPlayground (${FIXTURE}) Events Handlers`, function() {
  var render = require('tests/lib/render-component.js'),
      fixture = require(`fixtures/component-playground/${FIXTURE}.js`);

  var component;

  beforeEach(function() {
    ({component} = render(fixture));
  });

  it('should only render selected component based on search value', function() {
    expect(component.getFilteredComponents())
      .to.have.all.keys('FirstComponent');
  });
});
