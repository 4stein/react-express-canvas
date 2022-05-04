const currentTask = process.env.npm_lifecycle_event;
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const config = {
  mode: "development",
  target: "web",

  entry: {
    bundle: path.join(__dirname, "src/index.js"),
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name][contenthash].js",
    assetModuleFilename: "images/[contenthash][ext][query]",
    // clean: true,
  },
  devtool: "source-map",
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    compress: true,
    port: 3001,
    open: true,
    hot: true,
    historyApiFallback: true,
  },

  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          currentTask == "start"
            ? "style-loader"
            : {
                loader: MiniCssExtractPlugin.loader,
                options: { publicPath: "" },
              },
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.[jt]sx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                { useBuiltIns: "usage", corejs: 3, targets: "defaults" },
              ],
              "@babel/preset-react",
            ],
          },
        },
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(png|svg|jpe?g|gif)$/i,
        type: "asset/resource",
        //type: "asset/resource", // "asset", // "asset/inline",
        exclude: /fonts/,
        // loader: 'file-loader'
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        loader: "file-loader",
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({ filename: "main.[fullhash].css" }),
    new HtmlWebpackPlugin({
      title: "Project App",
      template: "./src/index.html",
      favicon: "./src/images/react-img.jpg",
    }),
  ],

  resolve: {
    extensions: [".js", ".jsx", ".tsx", ".ts"],
  },
};

if (currentTask == "build") {
  config.mode = "production";
  config.target = ["web", "es5"];
  config.plugins.push(
    new CleanWebpackPlugin(),
    new WebpackManifestPlugin()
    // new BundleAnalyzerPlugin()
  );
}

module.exports = config;
