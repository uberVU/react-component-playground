var FIXTURE = 'default';
var style = require('components/component-playground.less');

describe(`Pane (${FIXTURE}) Render DOM`, function() {
  var $ = require('jquery'),
      render = require('tests/lib/render-component.js'),
      fixture = require(`fixtures/Pane/${FIXTURE}.js`),
      element = require('components/Pane.jsx');

  var component,
      $component,
      container,
      fixture;

  beforeEach(function() {
    ({container, component, $component} = render(fixture, element));
  });

  it('should have proper split class', function() {
    expect($component.hasClass(style[fixture.split])).to.be.true;
  });
});
