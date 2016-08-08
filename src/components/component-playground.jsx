var style = require('./component-playground.less');

var _ = require('lodash'),
    React = require('react'),
    classNames = require('classnames'),
    ComponentTree = require('react-component-tree'),
    stringifyParams = require('react-querystring-router').uri.stringifyParams,
    parseLocation = require('react-querystring-router').uri.parseLocation,
    isSerializable = require('../lib/is-serializable.js').isSerializable,
    localStorageLib = require('../lib/local-storage.js'),
    Provider = require('react-redux').Provider,
    redux = require('redux'),
    SplitPane = require('ubervu-react-split-pane'),
    changeFixture = require('../actions/change-fixture.js').changeFixture,
    store = require('../store/create-store.js')();

module.exports = React.createClass({
  /**
   * ComponentPlayground provides a minimal frame for loading React components
   * in isolation. It can either render the component full-screen or with the
   * navigation pane on the side.
   */
  displayName: 'ComponentPlayground',

  mixins: [ComponentTree.Mixin],

  propTypes: {
    components: React.PropTypes.object.isRequired,
    component: React.PropTypes.string,
    fixture: React.PropTypes.string,
    editor: React.PropTypes.bool,
    fullScreen: React.PropTypes.bool,
    containerClassName: React.PropTypes.string
  },

  statics: {
    isFixtureSelected: function(props) {
      return !!(props.component && props.fixture);
    },

    didFixtureChange: function(prevProps, nextProps) {
      return prevProps.component !== nextProps.component ||
             prevProps.fixture !== nextProps.fixture;
    },

    getSelectedComponentClass: function(props) {
      return props.components[props.component].class;
    },

    getSelectedFixtureContents: function(props) {
      return props.components[props.component]
                  .fixtures[props.fixture];
    },

    getStringifiedFixtureContents: function(fixtureContents) {
      return JSON.stringify(fixtureContents, null, 2);
    },

    getFixtureState: function(props) {
      var state = {
        fixtureContents: {},
        fixtureUnserializableProps: {},
        fixtureUserInput: '{}',
        isFixtureUserInputValid: true
      };

      if (this.isFixtureSelected(props)) {
        var originalFixtureContents = this.getSelectedFixtureContents(props),
            fixtureContents = {},
            fixtureUnserializableProps = {};

        // Unserializable props are stored separately from serializable ones
        // because the serializable props can be overriden by the user using
        // the editor, while the unserializable props are always attached
        // behind the scenes
        _.forEach(originalFixtureContents, function(value, key) {
          if (isSerializable(value)) {
            fixtureContents[key] = value;
          } else {
            fixtureUnserializableProps[key] = value;
          }
        });

        _.assign(state, {
          fixtureContents: fixtureContents,
          fixtureUnserializableProps: fixtureUnserializableProps,
          fixtureUserInput: this.getStringifiedFixtureContents(fixtureContents)
        });
      }

      return state;
    }
  },

  getDefaultProps: function() {
    return {
      editor: false,
      fullScreen: false
    };
  },

  getInitialState: function() {
    var defaultState = {
      fixtureChange: 0,
      isEditorFocused: false,
      orientation: 'landscape',
      searchText: ''
    };

    return _.assign(defaultState, this.constructor.getFixtureState(this.props));
  },

  children: {
    preview: function() {
      var params = {
        component: this.constructor.getSelectedComponentClass(this.props),
        ref: this._saveRef('preview'),
        // Child should re-render whenever fixture changes
        key: this._getPreviewComponentKey()
      };

      // Shallow apply unserializable props
      _.assign(params, this.state.fixtureUnserializableProps);

      return _.merge(params, _.omit(this.state.fixtureContents, 'state'));
    },

    splitPane: function() {
      return {
        component: SplitPane,
        key: 'editorPreviewSplitPane',
        split: this._getOrientationDirection(),
        defaultSize: localStorageLib.get('splitPos'),
        onChange: this.onSplitPaneChange,
        minSize: 20,
        className: this._getSplitPaneClasses('split-pane'),
        resizerClassName: this._getSplitPaneClasses('resizer'),
        children: [
          this._renderFixtureEditor(),
          this.loadChild('provider')
        ]
      };
    },

    provider: function() {
      return {
        component: Provider,
        key: 'provider',
        store: store,
        children: this._renderPreview()
      }
    }
  },

  render: function() {
    var isFixtureSelected = this._isFixtureSelected();

    var classes = {};
    classes[style['component-playground']] = true;
    classes[style['full-screen']] = this.props.fullScreen;
    classes = classNames(classes);

    return (
      <div className={classes}>
        <div className={style['left-nav']}>
          <div className={style.header}>
            {this._renderHomeButton()}
            {isFixtureSelected ? this._renderMenu() : null}
          </div>
          <div className={style['fixtures']}>
            <div className={style['filter-input-container']}>
              <input className={style['filter-input']} onChange={this.onChange}/>
            </div>
            {this._renderFixtures()}
          </div>
        </div>
        {isFixtureSelected ? this._renderContentFrame() : null}
      </div>
    );
  },

  onChange: function(e) {
    this.setState({
      searchText: e.target.value
    });
  },

  _renderFixtures: function() {
    console.log(this._getFilteredFixtures())
    console.log(this.props.components)
    console.log(_.isEqual(this.props.components, this._getFilteredFixtures()))
    return <ul className={style.components}>
      {_.map(this._getFilteredFixtures(), function(component, componentName) {
        return <li className={style.component} key={componentName}>
          <p ref={'componentName-' + componentName}
             className={style['component-name']}>{componentName}</p>
          {this._renderComponentFixtures(componentName, component.fixtures)}
        </li>;

      }.bind(this))}
    </ul>
  },

  _getFilteredFixtures() {
    var searchText = this.state.searchText;

    return _.reduce(this.props.components, function(acc, component, componentName) {
        var fixtureNames = Object.keys(component.fixtures);
        var filteredFixtures = _.filter(fixtureNames, function(fixtureName) {
          return fixtureName.indexOf(this.state.searchText) !== -1 ||
            this._isCurrentFixtureSelected(componentName, fixtureName);
        }.bind(this));

        // There's no need to show components that doesn't have any results
        if (filteredFixtures.length === 0) {
          return acc;
        }

        var fixtures = _.reduce(filteredFixtures, function(acc, fixtureName) {
          acc[fixtureName] = component.fixtures[fixtureName];

          return acc;
        }, {});

        acc[componentName] = {
          fixtures: fixtures,
          class: component.class
        }

        return acc;
      }.bind(this), {});
  },

  _renderComponentFixtures: function(componentName, fixtures) {
    return <ul className={style['component-fixtures']}>
      {_.map(fixtures, function(props, fixtureName) {
        var fixtureProps = this._extendFixtureRoute({
          component: componentName,
          fixture: fixtureName
        });

        return <li className={this._getFixtureClasses(componentName,
                                                      fixtureName)}
                   key={fixtureName}>
          <a ref={'fixtureButton-' + componentName + '-' + fixtureName}
             href={stringifyParams(fixtureProps)}
             title={fixtureName}
             onClick={this.onFixtureClick}>
            {fixtureName}
          </a>
        </li>;

      }.bind(this))}
    </ul>;
  },

  _renderPreview: function() {
    return function() {
      return <div ref={this._saveRef('previewContainer')}
        key="previewContainer"
        className={this._getPreviewClasses()}>
          {this.loadChild('preview')}
      </div>
    }.bind(this)
  },

  _renderContentFrame: function() {
    return <div ref="contentFrame" className={this._getContentFrameClasses()}>
      {this.props.editor ? this.loadChild('splitPane')
                         : this.loadChild('provider')}
    </div>
  },

  _renderFixtureEditor: function() {
    var editorClasses = {};
    editorClasses[style['fixture-editor']] =  true;
    editorClasses[style['invalid-syntax']] =
      !this.state.isFixtureUserInputValid;
    editorClasses = classNames(editorClasses);

    return <div key="fixture-editor-outer"
                className={style['fixture-editor-outer']}>
      <textarea ref="editor"
                className={editorClasses}
                value={this.state.fixtureUserInput}
                onFocus={this.onEditorFocus}
                onBlur={this.onEditorBlur}
                onChange={this.onFixtureChange}>
      </textarea>
    </div>;
  },

  _renderHomeButton: function() {
    var classes = {};
    classes[style.button] = true;
    classes[style['play-button']] = true;
    classes[style['selected-button']] = !this._isFixtureSelected();

    classes = classNames(classes);

    return <a ref="homeButton"
              className={classes}
              href={stringifyParams({})}
              onClick={this.props.router.routeLink}>
      <span className={style.electron}></span>
    </a>;
  },

  _renderMenu: function() {
    return <p className={style.menu}>
      {this._renderFixtureEditorButton()}
      {this._renderFullScreenButton()}
    </p>;
  },

  _renderFixtureEditorButton: function() {
    var classes = {};
    classes[style.button] = true;
    classes[style['fixture-editor-button']] = true;
    classes[style['selected-button']] = this.props.editor;
    classes = classNames(classes);

    var editorUrlProps = this._extendFixtureRoute({
      editor: !this.props.editor
    });

    return <a className={classes}
              href={stringifyParams(editorUrlProps)}
              ref="editorButton"
              onClick={this.props.router.routeLink}></a>;
  },

  _renderFullScreenButton: function() {
    var fullScreenProps = this._extendFixtureRoute({
      fullScreen: true,
      editor: false
    });

    return <a className={style.button + ' ' + style['full-screen-button']}
              href={stringifyParams(fullScreenProps)}
              ref="fullScreenButton"
              onClick={this.props.router.routeLink}></a>;
  },

  componentDidMount: function() {
    this._fixtureUpdateInterval = setInterval(this.onFixtureUpdate, 100);

    if (this.refs.preview) {
      store.dispatch(changeFixture(this.state.fixtureContents));
      this._injectPreviewChildState();
    }

    window.addEventListener('resize', this.onWindowResize);

    this._updateContentFrameOrientation();

    if (this.props.component) {
      this.refs['componentName-' + this.props.component]
        .getDOMNode().scrollIntoView({behavior:'smooth'});
    }
  },

  componentWillReceiveProps: function(nextProps) {
    if (this.constructor.didFixtureChange(this.props, nextProps)) {
      this.setState(this.constructor.getFixtureState(nextProps));
    }
  },

  shouldComponentUpdate: function(nextProps, nextState) {
    // This is pretty wasteful, but it's more important to make sure the loaded
    // component doesn't render on every onFixtureUpdate loop, unless its state
    // changed
    return !_.isEqual(this.props, nextProps) ||
           !_.isEqual(_.omit(this.state, 'isEditorFocused'),
                      _.omit(nextState, 'isEditorFocused'));
  },

  componentDidUpdate: function(prevProps, prevState) {
    if (this.refs.preview && (
        this.constructor.didFixtureChange(prevProps, this.props) ||
        prevState.fixtureChange !== this.state.fixtureChange)) {
      store.dispatch(changeFixture(this.state.fixtureContents));
      this._injectPreviewChildState();
    }
  },

  componentWillUnmount: function() {
    clearInterval(this._fixtureUpdateInterval);

    window.removeEventListener('resize', this.onWindowResize);
  },

  onFixtureClick: function(event) {
    event.preventDefault();

    var location = event.currentTarget.href,
        params = parseLocation(location);

    if (this.constructor.didFixtureChange(this.props, params)) {
      this.props.router.goTo(location);
    } else {
      // This happens when we want to reset a fixture to its original state by
      // clicking on the fixture button while already selected
      var originalState = this.constructor.getFixtureState(this.props);

      // We also need to bump fixtureChange to trigger a key change for the
      // preview child, because the component and fixture names didn't change
      this.setState(_.assign(originalState, {
        fixtureChange: this.state.fixtureChange + 1
      }));
    }

    // Focus on the editor when changing fixture, to prevent overriding
    // its contents with the state generated by the initial unfolding of the
    // rendered component tree
    if (this.props.editor) {
      this._focusOnEditor();
    }
  },

  onEditorFocus: function(event) {
    this.setState({isEditorFocused: true});
  },

  onEditorBlur: function(event) {
    this.setState({isEditorFocused: false});
  },

  onFixtureUpdate: function() {
    if (!this.refs.preview ||
        // Don't update fixture contents while the user is editing the fixture
        this.state.isEditorFocused) {
      return;
    }

    var snapshot = ComponentTree.serialize(this.refs.preview);

    // Continue to ignore unserializable props
    var serializableSnapshot =
        _.omit(snapshot, _.keys(this.state.fixtureUnserializableProps));

    this.setState({
      fixtureContents: serializableSnapshot,
      fixtureUserInput:
          this.constructor.getStringifiedFixtureContents(serializableSnapshot),
      isFixtureUserInputValid: true
    });
  },

  onFixtureChange: function(event) {
    var userInput = event.target.value,
        newState = {fixtureUserInput: userInput};

    try {
      var fixtureContents = {};

      if (userInput) {
        _.merge(fixtureContents, JSON.parse(userInput));
      }

      _.assign(newState, {
        fixtureContents: fixtureContents,
        fixtureChange: this.state.fixtureChange + 1,
        isFixtureUserInputValid: true
      });
    } catch (e) {
      newState.isFixtureUserInputValid = false;
      console.error(e);
    }

    this.setState(newState);
  },

  onWindowResize: function(e) {
    this._updateContentFrameOrientation();
  },

  onSplitPaneChange: function(size) {
    localStorageLib.set('splitPos', size);
  _isFixtureSelected: function() {
    return this.constructor.isFixtureSelected(this.props);
  },

  _saveRef: function(name) {
    // In a Provider context, we can only use callbacks to save component refs.
    return function(ref) {
      this.refs[name] = ref;
    }.bind(this);
  },

  _getOrientationDirection: function() {
    return this.state.orientation === 'landscape' ? 'vertical' : 'horizontal';
  },

  _getSplitPaneClasses: function(type) {
    return classNames(style[this._getOrientationDirection()], style[type]);
  },

  _getPreviewComponentKey: function() {
    return this.props.component + '-' +
           this.props.fixture + '-' +
           this.state.fixtureChange;
  },

  _getContentFrameClasses: function() {
    var classes = {};
    classes[style['content-frame']] = true;
    classes[style['with-editor']] = this.props.editor;
    classes[style['orientation-' + this.state.orientation]] = true;
    return classNames(classes);
  },

  _getPreviewClasses: function() {
    var classes = {};
    classes[style.preview] = true;

    if (this.props.containerClassName) {
      classes[this.props.containerClassName] = true;
    }

    return classNames(classes);
  },

  _getFixtureClasses: function(componentName, fixtureName) {
    var classes = {};
    classes[style['component-fixture']] = true;
    classes[style.selected] = this._isCurrentFixtureSelected(componentName,
                                                             fixtureName);

    return classNames(classes);
  },

  _isCurrentFixtureSelected(componentName, fixtureName) {
    return componentName === this.props.component &&
           fixtureName === this.props.fixture;
  },

  _extendFixtureRoute: function(newProps) {
    var currentProps = {
      component: this.props.component,
      fixture: this.props.fixture,
      editor: this.props.editor,
      fullScreen: this.props.fullScreen
    };

    var defaultProps = this.constructor.getDefaultProps(),
        props = _.assign(_.omit(currentProps, _.keys(newProps)), newProps);

    // No need to include props with default values
    return _.omit(props, function(value, key) {
      return value === defaultProps[key];
    });
  },

  _focusOnEditor: function() {
    this.refs.editor.getDOMNode().focus();
  },

  _injectPreviewChildState: function() {
    var state = this.state.fixtureContents.state;

    if (!_.isEmpty(state)) {
      ComponentTree.injectState(this.refs.preview, _.cloneDeep(state));
    }
  },

  _updateContentFrameOrientation: function() {
    if (!this._isFixtureSelected()) {
      return;
    }

    var contentNode = this.refs.contentFrame.getDOMNode();

    this.setState({
      orientation: contentNode.offsetHeight > contentNode.offsetWidth ?
                   'portrait' : 'landscape'
    });
  }
});
