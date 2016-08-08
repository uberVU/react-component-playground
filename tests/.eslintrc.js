module.exports = {
  'extends': '../.eslintrc.js',

  'globals': {
    /* testing objects */
    'document': false,
    'sinon': false,
    'window': false,

    /* testing methods */
    'beforeEach': false,
    'afterEach': false,
    'describe': false,
    'expect': false,
    'it': false,
  },

  'rules': {
    'guard-for-in': 0
  }
};
