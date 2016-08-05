var FIXTURE = 'selected-fixture';

describe(`ComponentPlayground (${FIXTURE}) Events Handlers`, function() {
  var render = require('tests/lib/render-component.js'),
      fixture = require(`fixtures/component-playground/${FIXTURE}.js`);

  var component,
      fixture;

  beforeEach(function() {
    ({component} = render(fixture));

    sinon.spy(component, 'setState');
  });

  afterEach(function() {
    component.setState.restore();
  });

  describe('orientation', function() {
    function simulateWindowResize(width, height) {
      sinon.stub(component.refs.contentFrame, 'getDOMNode').returns({
        offsetWidth: width,
        offsetHeight: height
      });

      component.onWindowResize();
    }

    afterEach(function() {
      component.refs.contentFrame.getDOMNode.restore();
    });

    it('should be set to landscape on width > height', function() {
      simulateWindowResize(300, 200);

      expect(component.setState.args[0][0].orientation).to.equal('landscape');
    });

    it('should be set to landscape on width == height', function() {
      simulateWindowResize(300, 300);

      expect(component.setState.args[0][0].orientation).to.equal('landscape');
    });

    it('should be set to portrait on width < height', function() {
      simulateWindowResize(200, 300);

      expect(component.setState.args[0][0].orientation).to.equal('portrait');
    });
  });
});
