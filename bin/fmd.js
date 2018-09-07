#! /usr/bin/env node
"use strict";
const commander = require("commander");
const chalk = require("chalk");
const figlet = require("figlet");
const colors = require("colors");

commander.version(require("../package.json").version);
commander.usage('<dev> to run module server......');

commander.command("dev")
  .description('run local project command')
  .action(async function (cmd) {
    //启动web服务
  });
commander.parse(process.argv);
if (!commander.args.length) {
  console.log();
  console.log(figlet.textSync('freedom', '3D-ASCII'));
  commander.help();
}
//process.platform