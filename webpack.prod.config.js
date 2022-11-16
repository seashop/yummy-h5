require("dotenv").config();
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");
// const { DEV, DEBUG } = process.env;
// process.env.BABEL_ENV = DEV ? "development" : "production";
// process.env.NODE_ENV = DEV ? "development" : "production";
const contentBasePath = process.env.CONTENT_BASE_PATH;
module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "[name].[contenthash:8].js",
    publicPath: contentBasePath,
  },
  mode: "production",
  devtool: "source-map",
  optimization: {
    usedExports: false,
    minimizer: [
      new TerserPlugin({
        parallel: false,
        terserOptions: {
          output: {
            comments: false,
          },
        },
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
    minimize: true,
    splitChunks: {
      minSize: 500000,
      cacheGroups: {
        vendors: false,
      },
    },
  },
  resolve: {
    extensions: [".js", ".jsx"],
    alias: {
      "@img": path.resolve(__dirname, "assets/img"),
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(less)$/,
        exclude: /\.module\.less$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 2,
            },
          },
          {
            loader: "less-loader",
          },
        ],
      },
      {
        test: /\.(sass|scss)$/,
        include: path.resolve(__dirname, "src"),
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
            options: {
              modules: true,
              importLoaders: 2,
            },
          },
          {
            loader: "sass-loader",
          },
        ],
      },
      {
        test: /\.png/,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "/public/index.html"),
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
    new webpack.DefinePlugin({
      contentBasePath: contentBasePath,
    }),
  ],
};
