#!/usr/bin/env node
"use strict";
const commander = require("commander");
const chalk = require("chalk");
const figlet = require("figlet");
const colors = require("colors");
const login = require("../libs/login");

commander.version(require("../package.json").version);
commander.usage('<clean、dev> to run module server......');
const webUiStart = require("../web/index");
commander.command("clean")
  .description("clear freedom local cache")
  .action(async function (cmd) {

  });
commander.command("dev")
  .description('module develop command')
  .action(async function (cmd) {
    //构建web
    //await webUiStart("prod");
    //启动server服务
    require("../server/server");
  });
commander.parse(process.argv);
if (!commander.args.length) {
  console.log();
  console.log(figlet.textSync('freedom', '3D-ASCII'));
  commander.help();
}
//process.platform