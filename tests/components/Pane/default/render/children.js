var FIXTURE = 'default';
var style = require('components/component-playground.less');

describe(`Pane (${FIXTURE}) Render Children`, function() {
  var loadChild = require('react-component-tree').loadChild,
      render = require('tests/lib/render-component.js'),
      stubLoadChild = require('tests/setup/stub-load-child.js'),
      fixture = require(`fixtures/Pane/${FIXTURE}.js`),
      element = require('components/Pane.jsx');

  var component,
      $component,
      container,
      fixture;

  stubLoadChild();

  beforeEach(function() {
    ({container, component, $component} = render(fixture, element));
  });

  // it('should pass child same split prop', function() {
  //   expect(component.).to.equal(component.props.split);
  // });
});
