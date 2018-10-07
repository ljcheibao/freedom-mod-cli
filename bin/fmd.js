#!/usr/bin/env node
"use strict";
const commander = require("commander");
const chalk = require("chalk");
const figlet = require("figlet");
const colors = require("colors");

commander.version(require("../package.json").version);
commander.usage('<dev> to run module server......');
const webUiStart = require("../web/index");

commander.command("dev")
  .description('run local project command')
  .action(async function (cmd) {
    //构建web
    //await webUiStart("prod");
    //启动server服务
    require("../server/server");
    //mod模块的启动
  });
commander.parse(process.argv);
if (!commander.args.length) {
  console.log();
  console.log(figlet.textSync('freedom', '3D-ASCII'));
  commander.help();
}
//process.platform