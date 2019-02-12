const path = require('path');
const webpackBuild = require("freedom-middleware-webpack2");

const params = {
  root: path.resolve(__dirname, ""),
  port: 9191,
  env: "dev",
  entryDir: "entry",
  publicPath: ``,
  build: path.resolve(__dirname, "../server/static/build"),
  proxy: {
    context: [
      "/api"
    ],
    options: {
      target: "http://localhost:9000"
    }
  }
};

async function dev() {
  await webpackBuild(params);
}


async function build() {
  params.env = "prod";
  //替换资源
  params.publicPath = ``;
  await webpackBuild(params);
}

module.exports = async function (env) {
  switch (env) {
    case "dev":
      await dev();
      break;
    case "prod":
      await build();
      break;
    default:
      break;
  }
}
//cdn.51talk.com/apollo/smart_crm/${version}/js/mainfest.js

//cdn.51talk.com/apollo/smart_crm/${version}/js/common.js

//cdn.51talk.com/apollo/smart_crm/${version}/css/mainfest.css
//cdn.51talk.com/apollo/smart_crm/${version}/css/common.css