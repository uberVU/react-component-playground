var FIXTURE = 'default';
var style = require('components/component-playground.less');

describe(`SplitPane (${FIXTURE}) Render DOM`, function() {
  var $ = require('jquery'),
      render = require('tests/lib/render-component.js'),
      fixture = require(`fixtures/SplitPane/${FIXTURE}.js`),
      element = require('components/SplitPane.jsx');

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

  it('should render 2 panes', function() {
    expect(component.refs.pane1).to.exist;
    expect(component.refs.pane2).to.exist;
  });

  it('should render a resizer', function() {
    expect(component.refs.resizer).to.exist;
  });
});
