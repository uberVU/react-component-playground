var FIXTURE = 'selected-fixture';
var style = require('components/component-playground.less');

describe(`ComponentPlayground (${FIXTURE}) Render DOM`, function() {
  var $ = require('jquery'),
      render = require('tests/lib/render-component.js'),
      fixture = require(`fixtures/component-playground/${FIXTURE}.js`);

  var component,
      $component,
      container,
      fixture;

  beforeEach(function() {
    ({container, component, $component} = render(fixture));
  });

  it('should add orientation class on content frame element', function() {
    var $contentFrame = $(component.refs.contentFrame.getDOMNode());

    expect($contentFrame.hasClass(
        style['orientation-' + component.state.orientation])).to.be.true;
  });

  it('should add container class on preview element', function() {
    var $previewContainer = $(component.refs.previewContainer.getDOMNode());

    expect($previewContainer.hasClass(fixture.containerClassName)).to.be.true;
  });

  it('should remove selected class on home button', function() {
    expect($(component.refs.homeButton.getDOMNode())
           .hasClass(style['selected-button'])).to.be.false;
  });

  it('should add extra class to selected fixture', function() {
    var classes = '.' + style['component-fixture'] + '.' + style.selected;
    var $fixture = $component.find(classes);

    expect($fixture.length).to.equal(1);
    expect($fixture.text()).to.equal('default');
  });

  it('should render full screen button', function() {
    expect(component.refs.fullScreenButton).to.exist;
  });

  it('should render fixture editor button', function() {
    expect(component.refs.editorButton).to.exist;
  });

  it('should not render SplitPane', function() {
    expect(component.refs.editorPreviewSplitPane).to.not.exist;
  });
});
