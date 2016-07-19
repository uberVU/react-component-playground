var React = require('react'),
    classNames = require('classnames'),
    style = require('./component-playground.less');

export default React.createClass({
  displayName: 'Resizer',

  propTypes: {
    onMouseDown: React.PropTypes.func.isRequired,
    split: React.PropTypes.oneOf(['vertical', 'horizontal'])
  },

  onMouseDown: function(event) {
    this.props.onMouseDown(event);
  },

  render: function() {
    var classes = {};
    classes[style[this.props.split]] = true;
    classes[style['resizer']] = true;
    classes = classNames(classes);

    return <span className={classes} onMouseDown={this.onMouseDown}/>;
  }
});
