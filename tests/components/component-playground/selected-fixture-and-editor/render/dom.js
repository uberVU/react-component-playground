var FIXTURE = 'selected-fixture-and-editor';
var style = require('src/components/component-playground.less');

describe(`ComponentPlayground (${FIXTURE}) Render DOM`, function() {
  var $ = require('jquery'),
      render = require('tests/lib/render-component.js'),
      fixture = require(`fixtures/component-playground/${FIXTURE}.js`);

  var component,
      fixture;

  beforeEach(function() {
    ({component} = render(fixture));
  });

  it('should render fixture editor', function() {
    expect(component.refs.editor).to.exist;
  });

  it('should add editor class on content frame node', function() {
    expect($(component.refs.contentFrame.getDOMNode())
           .hasClass(style['with-editor'])).to.be.true;
  });

  it('should add selected class on editor button', function() {
    expect($(component.refs.editorButton.getDOMNode())
           .hasClass(style['selected-button'])).to.be.true;
  });

  it('should populate editor textarea from state', function() {
    component.setState({
      fixtureUserInput: 'lorem ipsum'
    });

    expect(component.refs.editor.getCodeMirror().getValue())
           .to.equal('lorem ipsum');
  });

  it('should render a splitpane ', function() {
    expect(component.refs.splitPane).to.exist;
  });

  it('should add splitpane class on splitPane', function() {
    expect($(component.refs.splitPane.getDOMNode())
           .hasClass(style['split-pane'])).to.be.true;
  });

  it('should have proper split orientation on SplitPane', function() {
    var splitByOrientation = {
      portrait: 'horizontal',
      landscape: 'vertical'
    };

    expect(component.refs.splitPane.props.split)
      .to.equal(splitByOrientation[component.state.orientation]);
  });
});
