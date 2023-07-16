const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");
const { InjectManifest } = require("workbox-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// Add a plugin for a service worker and manifest file.
const serviceWorkerPlugin = new InjectManifest({
  swSrc: "./src-sw.js",
  swDest: "sw.js",
});

const manifestPlugin = new WebpackPwaManifest({
  name: "Thought Wand",
  short_name: "ThoughtWand",
  description: "JavaScript syntax highlighting simplifies note-taking by allowing efficient recording of information. Notes with titles and content are stored in local storage. Displayed in a user-friendly format, including titles, content, and timestamps, this approach offers a concise way to organize and retrieve important information using JavaScript.",
  publicPath: "/",
  fingerprints: false,
  inject: true,
  background_color: "#225ca3",
  theme_color: "#225ca3",
  start_url: "/",
  icons: [
    {
      src: path.resolve("./src/images/logo.png"),
      sizes: [96, 128, 192, 256, 384, 512], // multiple sizes
      destination: path.join("assets", "icons"),
    },
  ],
});

// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: "production",
    entry: {
      main: "./src/js/index.js",
      install: "./src/js/install.js",
    },
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "dist"),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./index.html",
        title: "PWA Text Editor",
      }),
      new MiniCssExtractPlugin(),
      serviceWorkerPlugin,
      manifestPlugin,
    ],

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, "css-loader"],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: "asset/resource",
        },
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
              plugins: [
                "@babel/transform-runtime",
                "@babel/plugin-proposal-object-rest-spread",
              ],
            },
          },
        },
      ],
    },
  };
};