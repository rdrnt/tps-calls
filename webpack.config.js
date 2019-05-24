const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

const paths = {
  src: path.resolve('./src'),
};

module.exports = {
  entry: path.join(paths.src, '/index.tsx'),
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: path.join(paths.src, '/index.html'),
      filename: './index.html',
    }),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    host: 'localhost',
    port: 8080,
    https: true,
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
