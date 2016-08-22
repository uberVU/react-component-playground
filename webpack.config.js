var path = require('path'),
    internalStylesheets = [path.resolve(__dirname,
        'src/components/component-playground.less')];

module.exports = {
  entry: './src/components/component-playground.jsx',
  externals: {
    'lodash': 'lodash',
    'react': 'react'
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
    }]
  },
  output: {
    libraryTarget: 'umd',
    library: 'ComponentPlayground',
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js'
  }
};
