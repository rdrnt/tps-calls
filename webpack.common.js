const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const rhTransformer = require('react-hot-ts/lib/transformer');
const ForkTsCheckerPlugin = require('fork-ts-checker-webpack-plugin');

const paths = {
  src: path.resolve('./src'),
  indexHtml: path.resolve('./public/index.html'),
};

const isDevelopment = process.env.NODE_ENV === 'development';

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
          getCustomTransformers,
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
    new HtmlWebPackPlugin({
      template: paths.indexHtml,
    }),
    new ForkTsCheckerPlugin({
      watch: path.resolve('src'),
    }),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(dotenv.parsed),
    }),
  ],
};

function getCustomTransformers() {
  return isDevelopment ? [rhTransformer()] : [];
}
