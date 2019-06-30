const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');

const paths = {
  src: path.resolve('./src'),
  indexHtml: path.resolve('./public/index.html'),
};

const isDevelopment = process.env.NODE_ENV === 'development';

var dotenv = require('dotenv').config({ path: __dirname + '/.env.local' });

module.exports = {
  entry: ['babel-polyfill', './src/index.tsx'],
  devtool: isDevelopment ? 'cheap-module-inline-source-map' : 'source-map',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: '[name].[hash].js',
    sourceMapFilename: '[name].[hash].map',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ['babel-loader', 'ts-loader'],
        include: paths.src,
        exclude: /node_modules/,
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
    new HtmlWebPackPlugin({
      inject: true,
      template: paths.indexHtml,
      filename: './index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
    new WebpackPwaManifest({
      name: 'tpscalls.live',
      short_name: 'tpscalls',
      description: 'live map of police',
      background_color: '#ffffff',
      crossorigin: null,
      icons: [],
    }),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(dotenv.parsed),
    }),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json'],
  },
  devServer: {
    host: 'localhost',
    port: 8080,
    // https: true,
    disableHostCheck: true,
    contentBase: paths.src,
    hot: true,
    watchContentBase: true,
    historyApiFallback: true,
    stats: {
      colors: true,
      context: paths.src,
      timings: true,
    },
  },
};
