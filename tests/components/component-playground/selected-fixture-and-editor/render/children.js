var FIXTURE = 'selected-fixture-and-editor';

describe(`ComponentPlayground (${FIXTURE}) Render Children`, function() {
  var loadChild = require('react-component-tree').loadChild,
      render = require('tests/lib/render-component.js'),
      spyLoadChild = require('tests/setup/spy-load-child.js'),
      fixture = require(`fixtures/component-playground/${FIXTURE}.js`);

  var component,
      childParams;

  spyLoadChild();

  beforeEach(function() {
    ({component} = render(fixture));

    childParams = component.children.preview.call(component);
  });

  it('should load splitpane', function() {
    expect(loadChild.loadChild).to.have.been.calledWith(component, 'splitPane');
  });

  it('should load editor', function() {
    expect(loadChild.loadChild).to.have.been.calledWith(component, 'editor');
  });

  it('should send correct value to editor', function() {
    expect(childParams.value).to.equal(fixture.state.fixtureUserInput);
  });
});
