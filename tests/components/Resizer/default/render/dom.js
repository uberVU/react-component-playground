var FIXTURE = 'default';
var style = require('components/component-playground.less');

describe(`Resizer (${FIXTURE}) Render DOM`, function() {
  var $ = require('jquery'),
      render = require('tests/lib/render-component.js'),
      fixture = require(`fixtures/Resizer/${FIXTURE}.js`),
      element = require('components/Resizer.jsx');

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
