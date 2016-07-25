var React = require('react'),
    classNames = require('classnames'),
    Pane = require('./Pane.jsx'),
    Resizer = require('./Resizer.jsx'),
    style = require('./component-playground.less');

export default React.createClass({
  displayName: 'SplitPane',

  propTypes: {
    minSize: React.PropTypes.number,
    defaultSize: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number,
    ]),
    split: React.PropTypes.string,
    onChange: React.PropTypes.func
  },

  getInitialState: function() {
    return {
      active: false,
      resized: false
    };
  },

  getDefaultProps: function() {
    return {
      minSize: 0
    };
  },

  componentDidMount: function() {
    document.addEventListener('mouseup', this.onMouseUp);
    document.addEventListener('mousemove', this.onMouseMove);
    var ref = this.refs.pane1;
    if (ref && this.props.defaultSize && !this.state.resized) {
      this.setState({
        size: this.props.defaultSize
      });
    }
  },

  componentWillUnmount: function() {
    document.removeEventListener('mouseup', this.onMouseUp);
    document.removeEventListener('mousemove', this.onMouseMove);
  },

  onMouseDown: function() {
    var position = this.props.split === 'vertical' ? event.clientX
                                                   : event.clientY;
    this.setState({
      active: true,
      position: position
    });
  },

  onMouseMove: function() {
    if (this.state.active) {
      var ref = this.refs.pane1;
      if (ref) {
        var node = ref.getDOMNode();
        var width = node.offsetWidth;
        var height = node.offsetHeight;
        var current = this.props.split === 'vertical' ? event.clientX
                                                      : event.clientY;
        var size = this.props.split === 'vertical' ? node.offsetWidth
                                                   : node.offsetHeight;
        var position = this.state.position;

        var newSize = size - (position - current);
        this.setState({
          position: current,
          resized: true
        });

        if (newSize >= this.props.minSize) {
          if (this.props.onChange) {
            this.props.onChange(newSize);
          }
          this.setState({
            size: newSize
          });
        }
      }
    }
  },

  onMouseUp: function() {
    this.setState({
      active: false
    });
  },

  render: function() {
    var split = this.props.split || 'vertical';
    var styles = {
      display: 'flex',
      flex: 1,
      position: 'relative',
      outline: 'none',
      overflow: 'hidden',
      userSelect: 'none'
    };

    if (split === 'horizontal') {
      styles = Object.assign(styles, {
        flexDirection: 'column',
        height: '100%',
        minHeight: '100%',
        position: 'absolute',
        top: 0,
        bottom: 0,
        width: '100%'
      });
    } else {
      styles = Object.assign(styles, {
        flexDirection: 'row',
        height: '100%',
        position: 'absolute',
        left: 0,
        right: 0
      });
    }

    var children = this.props.children;
    var classes = {};
    classes[style[this.props.split]] = true;
    classes[style['split-pane']] = true;
    classes = classNames(classes);

    return (
      <div className={classes} style={styles}>
        <Pane ref='pane1' key='pane1' size={this.state.size} split={split}>
            {children[0]}
        </Pane>
        <Resizer ref='resizer'
                 key='resizer'
                 split={split}
                 onMouseDown={this.onMouseDown} />
        <Pane ref='pane2' key='pane2' split={split}>
            {children[1]}
        </Pane>
      </div>
    );
  }
});
