// "use strict";
// const fs = require("fs");
// const path = require("path");
// const inquirer = require('inquirer');
// const mkdirp = require("mkdirp");
// const chalk = require("chalk");
// const os = require("os");
// const FormData = require('form-data');

// const fetch = require("../common/fetch");
// const freedomConf = require("../config/default").freedomConf;

// //本地配置文件目录
// const LOCAL_CONF_DIR = path.join(os.homedir(), "/.freedom/");
// const LOCAL_CONF_PATH = path.normalize(path.join(LOCAL_CONF_DIR, "/gitlab.txt"));
// const QUESTIONS = [{
//   type: "input",
//   name: "email",
//   message: "please enter your email："
// }, {
//   type: "password",
//   name: "password",
//   message: "please enter your password："
// }];
// class Login {
//   constructor() {
//     this.token = null;
//     if (!fs.existsSync(LOCAL_CONF_DIR)) mkdirp.sync(LOCAL_CONF_DIR);
//     if (fs.existsSync(LOCAL_CONF_PATH)) this.token = fs.readFileSync(LOCAL_CONF_PATH, "utf-8");
//   }

//   /**
//    * 用户gitlab的私有token
//    * @returns {null|*}
//    */
//   get privateToken() {
//     return this.token;
//   }

//   /**
//    * 登录gitlab账号
//    * @returns {Promise.<boolean>}
//    */
//   async login() {
//     if (!this.privateToken) {
//       let answer = await inquirer.prompt(QUESTIONS);
//       let form = new FormData();
//       form.append('email', answer.email);
//       form.append('password', answer.password);
//       console.log(chalk.green(`sign in,please waiting...`));
//       let result = await fetch.requestRemoteServer(remoteConf["session"], {
//         method: "Post",
//         body: form
//       });
//       fs.writeFileSync(LOCAL_CONF_PATH, result.private_token);
//       console.log(chalk.green(`sign in success!`));
//     } else {
//       console.log(chalk.green(`you have signed in!`));
//     }
//     return true;
//   }
// }

// module.exports = new Login();