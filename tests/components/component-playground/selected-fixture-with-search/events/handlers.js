var FIXTURE = 'selected-fixture-with-search';

describe(`ComponentPlayground (${FIXTURE}) Events Handlers`, function() {
  var render = require('tests/lib/render-component.js'),
      fixture = require(`fixtures/component-playground/${FIXTURE}.js`);

  var component,
      fixture;

  beforeEach(function() {
    ({component} = render(fixture));
  });

  it('should store the search input value in state', function() {
    component.onSearchChange({target: {value: 'index'}});

    expect(component.state.searchText).to.equal('index');
  });

  it('should filter the components', function() {
    expect(component.refs['componentName-FirstComponent']).to.exist;
    expect(component.refs['componentName-SecondComponent']).to.exist;
  });
});
