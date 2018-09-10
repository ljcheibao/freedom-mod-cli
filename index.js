const webUiStart = require("./web/index");
const program = require('commander');
require("./server/server");
program
  .version('0.0.1')
  .option('-d, --dev', '开发环境')
  .option('-b, --build', '编译环境')
  .parse(process.argv);
if (program.dev) {
  (async function () {
    await webUiStart("dev");
  })();
}

if (program.build) {
  (async function () {
    await webUiStart("prod");
  })();
}