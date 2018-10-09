const webpack = require("webpack");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const autoprefixer = require('autoprefixer');
const baseDir = process.cwd();
const path = require("path");
let webpackConf = {
  entry: {},
  output: {
    path: path.resolve(__dirname, "../build"),
    filename: "[name].js"
  },
  plugins:[
    new CleanWebpackPlugin(["build"], {
      root: path.resolve(__dirname,"../build"), //根目录
      verbose: true, //开启在控制台输出信息
      dry: false //启用删除文件
    })
  ],
  module: {
    rules: [{
      test: /(\.ts|\.tsx)$/,
      exclude: /(node_modules|bower_components)/,
      use: [{
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
        },
      }]
    },
    {
      test: /\.(jsx|js)$/,
      use: {
        loader: 'babel-loader',
        options: {
          babelrc: false,
          extends: path.resolve(__dirname, "../.babelrc")
        }
      },
      exclude: /node_modules/
    },
    {
      test: /\.html$/,
      use: {
        loader: "html-loader",
        options: {
          minimize: false
        }
      }
    },
    {
      test: /\.less$/,
      use: ["style-loader", "css-loader", "less-loader"]
    }]
  },
  resolveLoader: {
    modules: [
      path.resolve(__dirname, '../', 'node_modules'),
      "node_modules"
    ]
  },
  resolve: {
    alias: { //需要设置哪些库的别名

    },
    modules: [
      path.resolve(__dirname, '../', 'node_modules'),
      "node_modules"
    ],
    extensions: [ //开启后缀名的自动补全
      '.tsx',
      '.ts',
      '.js',
      '.jsx',
      '.vue',
      '.gif',
      '.css',
      '.scss',
      '.png',
      '.jpg',
      '.less'
    ]
  },
  externals: {
    vue: {
      root: 'Vue',
      commonjs: 'vue',
      commonjs2: 'vue',
      amd: 'vue'
    }
  }
};
module.exports = async function (params) {
  let entry = {
    "index": path.join(`${baseDir}/${params.modName}`, '/src/index.js')
  };
  webpackConf.entry = entry;
  webpackConf.resolve.modules.push(path.join(`${baseDir}/${params.modName}`, '/node_modules'));
  return webpackConf;
};