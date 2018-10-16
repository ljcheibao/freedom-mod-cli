var webpack = require("webpack");
const CopyWebpackPlugin = require('copy-webpack-plugin');
var path = require("path");
var baseDir = process.cwd();
module.exports = function () {
  var extendConf = {
    plugins: [
      new webpack.ProvidePlugin({
        axios: "axios",
        "window.axios": "axios"
      }),
      new CopyWebpackPlugin([{
        from: path.resolve(__dirname, "./images/block-logo.png"),
        to: path.resolve(__dirname, "../server/static/build/images")
      }])
    ],
    resolve: {
      alias: {
        "axios": path.resolve(baseDir, 'node_modules/axios/dist/axios.min.js'),
        'vue$': path.resolve(baseDir, 'node_modules/vue/dist/vue.min.js')
      }
    },
    module: {
      rules: [

      ]
    }
  };
  return extendConf;
};