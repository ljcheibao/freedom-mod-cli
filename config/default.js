const path = require("path");
const os = require("os");
module.exports.freedomConf = {
  gitClone:false,
  gitType: "github",
  gitOwner: "fe-tpl",
  gitRepoName: {
    "ejs": "ejs-mod-template"
  },
  localDir: path.join(os.homedir(), "/.freedom/")
};