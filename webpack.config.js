const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');

const paths = {
  src: path.resolve('./src'),
};

const isDevelopment = process.env.NODE_ENV === 'development';

module.exports = {
  entry: path.join(paths.src, '/index.tsx'),
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        include: paths.src,
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      inject: true,
      template: path.join(paths.src, '/index.html'),
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
    // new webpack.DefinePlugin(env.stringified),
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: isDevelopment
      ? path.join('assets', 'js', '[name].js')
      : path.join('assets', 'js', '[name].[hash:8].js'),
    chunkFilename: isDevelopment
      ? path.join('assets', 'js', '[name].chunk.js')
      : path.join('assets', 'js', '[name].[hash:8].chunk.js'),
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        uglifyOptions: {
          compress: false,
          ecma: 6,
          mangle: true,
        },
        sourceMap: true,
      }),
    ],
  },
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
