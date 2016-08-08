var FIXTURE = 'search-without-results';
var style = require('src/components/component-playground.less');

describe(`ComponentPlayground (${FIXTURE}) Render DOM`, function() {
  var $ = require('jquery'),
      render = require('tests/lib/render-component.js'),
      fixture = require(`fixtures/component-playground/${FIXTURE}.js`);

  var component;

  beforeEach(function() {
    ({component} = render(fixture));
  });

  it('should not render components', function() {
    expect($(component).find(style.components).html()).to.be.empty;
  });
});
