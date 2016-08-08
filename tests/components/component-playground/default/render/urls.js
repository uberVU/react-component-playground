var FIXTURE = 'default';

describe(`ComponentPlayground (${FIXTURE}) Render URLs`, function() {
  var render = require('tests/lib/render-component.js'),
      getUrlProps = require('tests/lib/get-url-props.js'),
      fixture = require(`fixtures/component-playground/${FIXTURE}.js`);

  var component,
      fixture;

  beforeEach(function() {
    ({component} = render(fixture));
  });

  it('should generate urls with component and fixture names', function() {
    for (var componentName in fixture.components) {
      var fixtures = fixture.components[componentName].fixtures;

      for (var fixtureName in fixtures) {
        var fixtureButton = component.refs[
            'fixtureButton-' + componentName + '-' + fixtureName];
        var urlProps = getUrlProps(fixtureButton);

        expect(urlProps).to.deep.equal({
          component: componentName,
          fixture: fixtureName
        });
      }
    }
  });
});
