var FIXTURE = 'full-screen';
var style = require('src/components/component-playground.less');

describe(`ComponentPlayground (${FIXTURE}) Render DOM`, function() {
  var render = require('tests/lib/render-component.js'),
      fixture = require(`fixtures/component-playground/${FIXTURE}.js`);

  var $component,
      fixture;

  beforeEach(function() {
    ({$component} = render(fixture));
  });

  it('should add full-screen class', function() {
    expect($component.hasClass(style['full-screen'])).to.equal(true);
  });
});
