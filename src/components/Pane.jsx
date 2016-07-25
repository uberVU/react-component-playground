var React = require('react'),
    classNames = require('classnames'),
    style = require('./component-playground.less');

export default React.createClass({
  displayName: 'Pane',

  propTypes: {
    split: React.PropTypes.oneOf(['vertical', 'horizontal']),
    children: React.PropTypes.object.isRequired
  },

  getInitialState: function() {
    return {};
  },

  render: function() {
    var classes = {};
    classes[style[this.props.split]] = true;
    classes[style['pane']] = true;
    classes = classNames(classes);

    var styles = {
      flex: 1,
      position: 'relative',
      outline: 'none',
      overflow: 'none'
    };
    if (this.props.size) {
      if (this.props.split === 'horizontal') {
        styles.height = this.props.size;
        styles.display = 'flex';
      } else {
        styles.width = this.props.size;
      }
      styles.flex = 'none';
    }

    return (
      <div className={classes} style={styles}>
        {this.props.children}
      </div>
    );
  }
});
