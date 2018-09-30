const nodeExternals = require('webpack-node-externals');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');

module.exports = {
  mode: "production",
  devtool: "source-map",
  plugins: [
    new CopyWebpackPlugin([
      {
        from: './src/www',
        to: 'www',
        ignore: ['*.ts']
      },
    ]),
    new CleanWebpackPlugin(['dist']),
  ],
  entry: {
    'blink.js': './src/blink/index.ts',
    'server.js': './src/server/server.ts',
    'www/js/bundle.js': './src/www/js/index.ts',
  },
  target: "node",
  externals: [nodeExternals()],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "[name]",
  },
  resolve: {
    extensions: [".ts", ".js"]
  },
  module: {
    rules: [
      { test: /\.ts$/, loader: "ts-loader" }
    ]
  }
};
