var $ = require('jquery'),
    ComponentTree = require('react-component-tree'),
    ComponentPlayground = require('src/components/component-playground.jsx');

module.exports = function(fixture) {
  var container = document.createElement('div'),
      component,
      $component;

  component = ComponentTree.render({
    component: ComponentPlayground,
    snapshot: fixture,
    container: container
  });

  $component = $(component.getDOMNode());

  return {
    container: container,
    component: component,
    $component: $component
  };
};
