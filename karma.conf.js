var path = require('path'),
    internalStylesheets = [path.resolve(__dirname,
        'src/components/component-playground.less')];

module.exports = function(config) {
  config.set({
    basePath: 'tests/',
    browsers: ['PhantomJS'],
    coverageReporter: {
      type: 'lcov',
      dir: 'coverage/'
    },
    files: [
      'local-storage.js',
      'bind-polyfill.js',
      'components/**/*.js',
      'actions/*.js',
      'reducers/*.js'
    ],
    frameworks: ['mocha', 'chai', 'sinon-chai'],
    preprocessors: {
      '**/*.js': ['webpack']
    },
    reporters: ['mocha', 'coverage'],
    webpack: {
      resolve: {
        alias: {
          src: path.join(__dirname, 'src'),
          fixtures: path.join(__dirname, 'fixtures'),
          tests: path.join(__dirname, 'tests')
        }
      },
      module: {
        loaders: [{
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        }, {
          test: /\.less$/,
          include: internalStylesheets,
          loader: 'style-loader!css-loader?modules&importLoaders=1' +
                  '&localIdentName=[name]__[local]___[hash:base64:5]' +
                  '!less-loader'
        }, {
          test: /\.less$/,
          exclude: internalStylesheets,
          loader: 'style-loader!css-loader!less-loader'
        }, {
          test: /\.css$/,
          loader: 'style-loader!css-loader'
        }],
        postLoaders: [{
          test: /\.jsx?$/,
          exclude: /(node_modules|tests)\//,
          loader: 'istanbul-instrumenter'
        }]
      }
    },
    webpackMiddleware: {
      noInfo: true
    }
  });
};
