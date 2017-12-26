const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const StartServerPlugin = require('start-server-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: ['webpack/hot/poll?1000', './src/index'],
  watch: true,
  target: 'node',
  externals: [
    nodeExternals({
      whitelist: ['webpack/hot/poll?1000'],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new StartServerPlugin('app.js'),
    new webpack.EnvironmentPlugin(['DISABLE_BOARD']),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new CleanWebpackPlugin(['*.hot-update.json', '*.hot-update.js']),
    new webpack.DefinePlugin({
      'process.env': { BUILD_TARGET: JSON.stringify('app') },
    }),
  ],
  output: {
    path: path.join(__dirname),
    filename: 'app.js',
  },
  node: {
    __dirname: false,
  },
};
