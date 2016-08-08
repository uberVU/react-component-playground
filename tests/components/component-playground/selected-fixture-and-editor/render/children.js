var FIXTURE = 'selected-fixture-and-editor';

describe(`ComponentPlayground (${FIXTURE}) Render Children`, function() {
  var loadChild = require('react-component-tree').loadChild,
      render = require('tests/lib/render-component.js'),
      stubLoadChild = require('tests/setup/stub-load-child.js'),
      fixture = require(`fixtures/component-playground/${FIXTURE}.js`);

  var component,
      fixture;

  stubLoadChild();

  beforeEach(function() {
    ({component} = render(fixture));
  });

  it('should load splitpane', function() {
    expect(loadChild.loadChild).to.have.been.calledWith(component, 'splitPane');
  });
});
