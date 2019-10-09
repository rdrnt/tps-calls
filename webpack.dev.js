const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  devServer: {
    hot: true,
    historyApiFallback: true,
    host: '0.0.0.0',
  },
});
