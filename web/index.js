const path = require('path');
const fs = require('fs');
const program = require('commander');
const webpackBuild = require("freedom-middleware-webpack2");

const params = {
  port: 3333,
  env: "dev",
  entryDir:"entry",
  publicPath: ``,
  build: `build/bms/`,
  proxy: {
    context: [

    ],
    options: {
      target: "http://localhost:9000"
    }
  }
};
program
  .version('0.0.1')
  .option('-d, --dev', '开发环境')
  .option('-b, --build', '编译环境')
  .parse(process.argv);
if (program.dev) {
  dev();
}

if (program.build) {
  build(program.build);
}

function dev(argument) {
  (async function () {
    await webpackBuild(params);
  })();
}


function build(argument) {
  params.env = "prod";
  params.publicPath = `http://www.51qututu.com/bms/`;
  (async function () {
    await webpackBuild(params);
  })();
}
