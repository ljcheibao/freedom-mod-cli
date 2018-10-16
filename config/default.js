const path = require("path");
const os = require("os");
module.exports.freedomConf = {
  gitClone: false,//是否clone模板
  gitType: "github",//模板存放的托管服务器，可以是gitlab
  gitOwner: "fe-tpl",//模板存放在托管代码服务的哪个group
  gitRepoName: {//模板名称
    "ejs": "ejs-mod-template"
  },
  sourceRepo: {//模块源码托管服务器，github或者gitlab

  },
  localDir: path.join(os.homedir(), "/.freedom/")
};