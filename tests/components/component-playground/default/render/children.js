var FIXTURE = 'default';

describe(`ComponentPlayground (${FIXTURE}) Render Children`, function() {
  var loadChild = require('react-component-tree').loadChild,
      render = require('tests/lib/render-component.js'),
      stubLoadChild = require('tests/setup/stub-load-child.js'),
      fixture = require(`fixtures/component-playground/${FIXTURE}.js`);

  stubLoadChild();

  beforeEach(function() {
    render(fixture);
  });

  it('should not load preview component', function() {
    expect(loadChild.loadChild).to.not.have.been.called;
  });
});
