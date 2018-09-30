const nodeExternals = require('webpack-node-externals');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

const config = {
  mode: 'production',
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]',
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      { test: /\.ts$/, loader: 'ts-loader' }
    ]
  }
};

const blinkConfig = Object.assign({}, config, {
  entry: {
    'blink.js': './src/blink/index.ts',
  },
  target: 'node',
  externals: [nodeExternals()],
});

const serverConfig = Object.assign({}, config, {
  entry: {
    'server.js': './src/server/server.ts',
  },
  target: 'node',
  externals: [nodeExternals()],
});

const webConfig = Object.assign({}, config, {
  entry: {
    'www/js/bundle.js': './src/www/js/index.ts',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]',
    libraryTarget: 'umd',
    library: 'EntryPoint',
    umdNamedDefine: true,
    libraryExport: 'EntryPoint',
  },
  target: 'web',
  externals: {
    jquery: 'jQuery',
    lodash: '_',
    tinycolor: 'tinycolor',
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: './src/www',
        to: 'www',
        ignore: ['*.ts']
      },
    ]),
  ],
});

module.exports = [blinkConfig, serverConfig, webConfig];
