const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    hot: true,
    historyApiFallback: true,
    host: '0.0.0.0',
  },
});
