var FIXTURE = 'selected-fixture-with-search';

describe(`ComponentPlayground (${FIXTURE}) Render DOM`, function() {
  var render = require('tests/lib/render-component.js'),
      fixture = require(`fixtures/component-playground/${FIXTURE}.js`);

  var component,
      fixture;

  beforeEach(function() {
    ({component} = render(fixture));
  });

  it('should render the second component based on search value', function() {
    expect(component.refs['componentName-SecondComponent']).to.exist;
  });

  it('should render the index fixture based on search value', function() {
    expect(component.refs['fixtureButton-SecondComponent-index']).to.exist;
  });

  it('should not render no-data fixture based on search value', function() {
    expect(component.refs['fixtureButton-SecondComponent-no-data'])
      .to.not.exist;
  });

  it('should not render error fixture based on search value', function() {
    expect(component.refs['fixtureButton-FirstComponent-error'])
      .to.not.exist;
  });

  it('should render the selected fixture regardless of search value',
      function() {
        expect(component.refs['fixtureButton-FirstComponent-default']).to.exist;
      }
  );
});
