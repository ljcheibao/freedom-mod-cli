var webpack = require("webpack");
var path = require("path");
var baseDir = process.cwd();
module.exports = function () {
  var extendConf = {
    plugins: [

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