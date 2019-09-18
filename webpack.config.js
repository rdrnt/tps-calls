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
  devtool: isDevelopment ? 'source-map' : 'source-map',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'app.js',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
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
    new HtmlWebPackPlugin(),
    new ForkTsCheckerPlugin({
      watch: path.resolve('src'),
      compilerOptions: {
        noUnusedLocals: false,
      },
    }),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(dotenv.parsed),
    }),
  ],
};

function getCustomTransformers() {
  return {
    before: [rhTransformer()],
  };
}
