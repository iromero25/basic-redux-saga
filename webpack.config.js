const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const outputPath = path.resolve(__dirname, "dist");

const config = {
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        use: ["ts-loader"],
        exclude: /node_modules/,
      },
    ],
  },
  devtool: "eval-source-map",
  entry: "./src/index.tsx",
  output: {
    path: outputPath,
    filename: "bundle.js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
    }),
  ],
};

module.exports = config;
