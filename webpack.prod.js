const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const TerserPlugin = require('terser-webpack-plugin');

const SentryCliPlugin = require('@sentry/webpack-plugin');

const packageJson = require('./package.json');

module.exports = env => {
  // if the env.NODE_ENV is local, don't upload source maps and stuff. It's a dry run for our build
  const { NODE_ENV } = env;
  const isDryRun = NODE_ENV && NODE_ENV === 'local';

  const getPlugins = () => {
    if (!isDryRun) {
      return [
        new SentryCliPlugin({
          include: './dist',
          configFile: '.sentryclirc',
          release: packageJson.version.toString(),
        }),
      ];
    }

    return [];
  };

  return merge(common, {
    mode: 'production',
    optimization: {
      minimize: true,
      minimizer: [new TerserPlugin()],
    },
    plugins: getPlugins(),
  });
};
