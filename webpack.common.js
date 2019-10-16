const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const ForkTsCheckerPlugin = require('fork-ts-checker-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');

const paths = {
  src: path.resolve('./src'),
  indexHtml: path.resolve('./public/index.html'),
};

var dotenv = require('dotenv').config({ path: __dirname + '/.env.local' });

module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          transpileOnly: true, // -> ForkTsCheckerPlugin
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
      { test: /.(eot|ttf|woff|woff2)(\?.+)?$/, loader: 'file-loader' },
    ],
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebPackPlugin({
      template: paths.indexHtml,
    }),
    new ForkTsCheckerPlugin({
      watch: path.resolve('src'),
    }),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(dotenv.parsed),
    }),
    new WebpackPwaManifest({
      name: 'tpscalls.live',
      short_name: 'tpscalls',
      description: 'Live toronto police calls',
      background_color: '#ffffff',
      orientation: 'portrait',
    }),
  ],
};
