// import { request } from "https";

"use strict";
const express = require("express");
const app = express();
const utils = require("./utils");
const webpack = require("webpack");
const axios = require("axios");
const config = require("../config");
const merge = require("webpack-merge");
const baseWebpackConfig = require("./webpack.base.conf");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin");
const portfinder = require("portfinder");

//axios初始化默认配置
axios.defaults.timeout = 2500;
const aHeaders = {
  referer: "https://m.dongqiudi.com",
  host: "m.dongqiudi.com"
};

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.dev.cssSourceMap,
      usePostCSS: true
    })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    historyApiFallback: true,
    hot: true,
    host: process.env.HOST || config.dev.host,
    port: process.env.PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? {
          warnings: false,
          errors: true
        }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll
    },
    before(app) {
      app.get("/api/tab", (req, res) => {
        const params = Object.assign({
          mark: "gif",
          version: 576,
          from: "msite"
        });
        let url = "https://api.dongqiudi.com/app/global/2/iphone.json";
        axios.get(url, { headers: aHeaders, params }).then(response => {
          res.json({ state: 0, data: response.data });
        });
      }),
        app.get("/api/news", (req, res) => {
          const params = Object.assign(
            {
              version: 576,
              from: "msite"
            },
            req.query
          );
          let url = "https://api.dongqiudi.com/app/tabs/iphone/1.json";
          axios.get(url, { headers: aHeaders, params }).then(response => {
            res.json({ state: 0, data: response.data });
          });
        }),
        app.get("/api/match", (req, res) => {
          let url = "https://api.dongqiudi.com/data/tab/new/important";
          const params = Object.assign(
            {
              start: "2017-11-2116:00",
              version: 576,
              init: 1
            },
            req.query
          );
          axios
            .get(url, {
              headers: aHeaders,
              params
            })
            .then(response => {
              res.json({
                state: 0,
                data: response.data
              });
            });
        }),
        app.get("/api/video", (req, res) => {
          let url = "https://api.dongqiudi.com/app/tabs/iphone/11.json";
          const params = Object.assign(
            {
              mark: "gif",
              version: 576,
              from: "msite"
            },
            req.query
          );
          axios
            .get(url, {
              headers: aHeaders,
              params
            })
            .then(response => {
              res.json({
                state: 0,
                data: response.data
              });
            });
        }),
        app.get("/api/data", (req, res) => {
          let url = "https://api.dongqiudi.com/data/v1/team_ranking/0";
          const params = Object.assign(
            {
              season_id: "9235",
              version: "0",
              refer: "data_tab",
              type: "total_ranking"
            },
            req.query
          );
          axios
            .get(url, {
              headers: aHeaders,
              params
            })
            .then(response => {
              res.json({
                state: 0,
                data: response.data
              });
            });
        }),
        app.get("/api/article", (req, res) => {
          let url = "https://api.dongqiudi.com/v2/article/detail/"+req.query.id;
          const params = Object.assign(
            {
              from: "msite"
            },
          );
          axios
            .get(url, {
              headers: aHeaders,
              params
            })
            .then(response => {
              res.json({
                state: 0,
                data: response.data
              });
            });
        });
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": require("../config/dev.env")
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "index.html",
      inject: true
    }),
    new FriendlyErrorsPlugin()
  ]
});

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port;
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err);
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port;
      // add port to devServer config
      devWebpackConfig.devServer.port = port;

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(
        new FriendlyErrorsPlugin({
          compilationSuccessInfo: {
            messages: [
              `Your application is running here: http://${config.dev.host}:${
                port
              }`
            ]
          },
          onErrors: config.dev.notifyOnErrors
            ? utils.createNotifierCallback()
            : undefined
        })
      );

      resolve(devWebpackConfig);
    }
  });
});
