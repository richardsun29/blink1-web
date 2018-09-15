const nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  entry: "./src/blink/blink.ts",
  target: "node",
  externals: [nodeExternals()],
  output: {
    filename: "blink.js"
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
