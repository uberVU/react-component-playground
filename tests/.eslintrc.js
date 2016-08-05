module.exports = {
  'extends': '../.eslintrc.js',

  'globals': {
    /* testing objects */
    'casper': false,
    'flow': false,
    'phantomCSS': false,
    'document': false,
    'sandbox': false,
    'TestHelpers': false,
    'sinon': false,
    'window': false,
    '_': false,

    /* testing methods */
    'before': false,
    'beforeEach': false,
    'after': false,
    'afterEach': false,
    'describe': false,
    'expect': false,
    'it': false,
    'step': false
  },

  'rules': {
    'guard-for-in': 0
  }
};
