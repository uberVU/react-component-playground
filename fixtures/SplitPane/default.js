var React = require('react');

module.exports = {
  split: 'vertical',

  children: [
    React.createElement('div', {
      key: '1',
      children: 'test child 1'
    }),

    React.createElement('div', {
      key: '2',
      children: 'test child 2'
    })
  ]
}
