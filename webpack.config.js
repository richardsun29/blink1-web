const nodeExternals = require('webpack-node-externals');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
  mode: "production",
  devtool: "inline-source-map",
  plugins: [
    new CopyWebpackPlugin([
      {
        from: './src/www',
        to: 'www',
        ignore: ['*.spec.ts', '*.spec.js']
      },
    ]),
  ],
  entry: {
    blink: "./src/blink/index.ts",
    server: "./src/server/server.ts",
  },
  target: "node",
  externals: [nodeExternals()],
  output: {
    filename: "[name].js",
    path: path.join(__dirname, 'dist'),
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
