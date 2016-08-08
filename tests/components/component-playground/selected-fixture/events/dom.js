var FIXTURE = 'selected-fixture';

describe(`ComponentPlayground (${FIXTURE}) Events DOM`, function() {
  var React = require('react/addons'),
      utils = React.addons.TestUtils,
      _ = require('lodash'),
      render = require('tests/lib/render-component.js'),
      fixture = require(`fixtures/component-playground/${FIXTURE}.js`);

  var component;

  var stubbedFixture = _.assign({}, fixture, {
    router: {
      goTo: sinon.spy(),
      routeLink: sinon.spy()
    }
  });

  beforeEach(function() {
    ({component} = render(stubbedFixture));
  });

  afterEach(function() {
    stubbedFixture.router.goTo.reset();
    stubbedFixture.router.routeLink.reset();
  });

  it('should route link on home button', function() {
    utils.Simulate.click(component.refs.homeButton.getDOMNode());

    expect(component.props.router.routeLink).to.have.been.called;
  });

  it('should route link on editor button', function() {
    utils.Simulate.click(component.refs.editorButton.getDOMNode());

    expect(component.props.router.routeLink).to.have.been.called;
  });

  it('should route link on full screen button', function() {
    utils.Simulate.click(component.refs.fullScreenButton.getDOMNode());

    expect(component.props.router.routeLink).to.have.been.called;
  });

  it('should route link on new fixture button', function() {
    utils.Simulate.click(
        component.refs['fixtureButton-FirstComponent-error'].getDOMNode());

    expect(component.props.router.goTo).to.have.been.called;
  });

  describe('Clicking button of already selected fixture', function() {
    var stateSet;

    beforeEach(function() {
      sinon.spy(component, 'setState');

      utils.Simulate.click(
          component.refs['fixtureButton-FirstComponent-default'].getDOMNode());

      stateSet = component.setState.lastCall.args[0];
    });

    beforeEach(function() {
      component.setState.restore();
    });

    it('should not route link', function() {
      expect(component.props.router.goTo).to.not.have.been.called;
    });

    it('should reset state', function() {
      var fixtureContents = _.omit(
          fixture.components.FirstComponent.fixtures.default,
          _.keys(component.state.fixtureUnserializableProps));

      expect(stateSet.fixtureContents).to.deep.equal(fixtureContents);
      expect(stateSet.fixtureUserInput).to.equal(
          JSON.stringify(fixtureContents, null, 2));
      expect(stateSet.isFixtureUserInputValid).to.equal(true);
    });

    it('should bump fixture change', function() {
      expect(stateSet.fixtureChange).to.equal(fixture.state.fixtureChange + 1);
    });
  });
});
