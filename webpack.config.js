const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { DEV, DEBUG } = process.env;
process.env.BABEL_ENV = DEV ? "development" : "production";
process.env.NODE_ENV = DEV ? "development" : "production";

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, "/dist"),
    filename: DEV ? "js/[name].[hash:8].js" : "js/[name].[contenthash:8].js",
  },
  mode: DEV ? "development" : "production",
  devtool: "inline-source-map",
  devServer: {
    port: 8080,
    open: false,
    historyApiFallback: true,
  },
  optimization: {
    usedExports: DEV ? true : false,
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
    minimize: !DEV,
    splitChunks: {
      minSize: 500000,
      cacheGroups: {
        vendors: false,
      },
    },
  },
  resolve: {
    extensions: [".js", ".jsx"],
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
              sourceMap: !!DEV,
            },
          },
          {
            loader: "less-loader",
            options: {
              sourceMap: !!DEV,
            },
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
              importLoaders: 2,
              sourceMap: !!DEV,
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: !!DEV,
            },
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
      publicPath: "/",
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
  ],
};
