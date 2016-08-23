var FIXTURE = 'selected-fixture-and-editor';

describe(`ComponentPlayground (${FIXTURE}) Events DOM`, function() {
  var React = require('react/addons'),
      CodeMirror = require('codemirror'),
      utils = React.addons.TestUtils,
      render = require('tests/lib/render-component.js'),
      fixture = require(`fixtures/component-playground/${FIXTURE}.js`);

  var component,
      fixture;

  beforeEach(function() {
    ({component} = render(fixture));
  });

  it('should focus on editor on fixture click', function() {
    var editor = component.refs.editor.getCodeMirror();
    sinon.spy(editor, 'focus');

    utils.Simulate.click(
        component.refs['fixtureButton-SecondComponent-index'].getDOMNode());

    expect(editor.focus).to.have.been.called;
  });

  describe('Editor events', function() {
    var stateSet;

    function triggerEditorEvent(event, eventData) {
      var editor = component.refs.editor.getCodeMirror();
      sinon.spy(component, 'setState');

      if (event === 'change') {
        editor.setValue(eventData);
      } else {
        CodeMirror.signal(editor, event, eventData);
      }

      stateSet = component.setState.lastCall.args[0];

      component.setState.restore();
    }

    function triggerEditorChange(value) {
      triggerEditorEvent('change', value);
    }

    it('should set state flag on editor focus', function() {
      triggerEditorEvent('focus');

      expect(stateSet.isEditorFocused).to.equal(true);
    });

    it('should unset state flag on editor blur', function() {
      triggerEditorEvent('blur');

      expect(stateSet.isEditorFocused).to.equal(false);
    });

    it('should update fixture user input on change', function() {
      triggerEditorChange('{"foo":"bar"}');

      expect(stateSet.fixtureUserInput).to.equal('{"foo":"bar"}');
    });

    it('should empty fixture contents on empty input', function() {
      triggerEditorChange('');

      expect(stateSet.fixtureContents).to.deep.equal({});
    });

    it('should not alter the original fixture contents', function() {
      triggerEditorChange('{"nested": {"foo": "foo"}}');

      expect(fixture.components.FirstComponent
             .fixtures.default.nested.foo).to.equal('bar');
    });

    describe('Valid editor input', function() {
      beforeEach(function() {
        triggerEditorChange('{"lorem": "ipsum"}');
      });

      it('should update fixture contents', function() {
        expect(stateSet.fixtureContents.lorem).to.equal('ipsum');
      });

      it('should mark valid change in state', function() {
        expect(stateSet.isFixtureUserInputValid).to.equal(true);
      });

      it('should bump fixture change counter', function() {
        expect(stateSet.fixtureChange)
              .to.equal(fixture.state.fixtureChange + 1);
      });
    });

    describe('Invalid editor input', function() {
      beforeEach(function() {
        triggerEditorChange('lorem ipsum');
      });

      it('should not update fixture contents', function() {
        expect(stateSet.fixtureContents).to.be.undefined;
      });

      it('should mark invalid change in state', function() {
        expect(stateSet.isFixtureUserInputValid).to.equal(false);
      });

      it('should not bump fixture change counter', function() {
        expect(stateSet.fixtureChange).to.be.undefined;
      });
    });
  });
});
