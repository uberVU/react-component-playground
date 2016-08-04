var FIXTURE = 'full-screen';
var style = require('src/components/component-playground.less');

describe(`ComponentPlayground (${FIXTURE}) Render DOM`, function() {
  var render = require('tests/lib/render-component.js'),
      fixture = require(`fixtures/component-playground/${FIXTURE}.js`);

  var component,
      $component,
      container,
      fixture;

  beforeEach(function() {
    ({container, component, $component} = render(fixture));
  });

  it('should add full-screen class', function() {
    expect($component.hasClass(style['full-screen'])).to.equal(true);
  });
});
