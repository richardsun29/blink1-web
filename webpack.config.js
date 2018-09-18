const nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  entry: {
    blink: "./src/blink/index.ts",
    server: "./src/server/server.ts",
  },
  target: "node",
  externals: [nodeExternals()],
  output: {
    filename: "[name].js"
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
