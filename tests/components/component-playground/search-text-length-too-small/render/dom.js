var FIXTURE = 'search-text-length-too-small';

describe(`ComponentPlayground (${FIXTURE}) Events Handlers`, function() {
  var render = require('tests/lib/render-component.js'),
      fixture = require(`fixtures/component-playground/${FIXTURE}.js`);

  var component,
      fixture;

  beforeEach(function() {
    ({component} = render(fixture));
  });

  it('should render all fixtures', function() {
    for (var componentName in fixture.components) {
      var fixtures = fixture.components[componentName].fixtures;

      for (var fixtureName in fixtures) {
        expect(component.refs[
            'fixtureButton-' + componentName + '-' + fixtureName]).to.exist;
      }
    }
  });
});
