var FIXTURE = 'default';

describe(`ComponentPlayground (${FIXTURE}) Render Children`, function() {
  var loadChild = require('react-component-tree').loadChild,
      render = require('tests/lib/render-component.js'),
      spyLoadChild = require('tests/setup/spy-load-child.js'),
      fixture = require(`fixtures/component-playground/${FIXTURE}.js`);

  spyLoadChild();

  beforeEach(function() {
    render(fixture);
  });

  it('should not load preview component', function() {
    expect(loadChild.loadChild).to.not.have.been.called;
  });
});
