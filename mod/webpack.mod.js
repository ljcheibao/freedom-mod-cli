const baseDir = process.cwd();
const path = require("path");
let webpackConf = {
  entry: {},
  output: {
    path: path.resolve(__dirname, "../build"),
    filename: "[name].js"
  },
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
          presets: [
            path.resolve(__dirname, "../node_modules/babel-preset-es2015"),
            path.resolve(__dirname, "../node_modules/babel-preset-stage-0")
          ],
          plugins: [
            path.resolve(__dirname, "../node_modules/babel-plugin-transform-runtime"),
            path.resolve(__dirname, "../node_modules/babel-plugin-transform-remove-strict-mode"),
            path.resolve(__dirname, "../node_modules/babel-plugin-add-module-exports"),
            path.resolve(__dirname, "../node_modules/babel-plugin-typecheck"),
            path.resolve(__dirname, "../node_modules/babel-plugin-transform-decorators-legacy")
          ]
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
  console.log("this is ========== " + __dirname);
  let entry = {
    "index": path.join(`${baseDir}/${params.modName}`, '/src/index.js')
  };
  webpackConf.entry = entry;
  webpackConf.resolve.modules.push(path.join(`${baseDir}/${params.modName}`, '/node_modules'));
  return webpackConf;
};