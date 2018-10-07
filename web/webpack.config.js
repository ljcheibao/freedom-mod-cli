var webpack = require("webpack");
var path = require("path");
var baseDir = process.cwd();
module.exports = function () {
  var extendConf = {
    plugins: [
      new webpack.ProvidePlugin({
        axios: "axios",
        "window.axios": "axios"
      }),
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