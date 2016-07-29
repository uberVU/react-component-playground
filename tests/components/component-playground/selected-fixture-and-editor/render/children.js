var FIXTURE = 'selected-fixture-and-editor';

describe(`ComponentPlayground (${FIXTURE}) Render Children`, function() {
  var loadChild = require('react-component-tree').loadChild,
      render = require('tests/lib/render-component.js'),
      stubLoadChild = require('tests/setup/stub-load-child.js'),
      fixture = require(`fixtures/component-playground/${FIXTURE}.js`);

  var component,
      $component,
      container,
      fixture;

  stubLoadChild();

  beforeEach(function() {
    ({container, component, $component} = render(fixture));
  });

  it('should load preview and splitpane', function() {
    expect(loadChild.loadChild).to.have.been.called.twice;
  });
});