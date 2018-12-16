const webpack = require('webpack');
const getClientEnvironment = require('./env');

const env = getClientEnvironment('');
module.exports = {
  plugins: [new webpack.DefinePlugin(env.stringified)],
};
