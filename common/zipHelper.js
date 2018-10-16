const archiver = require('archiver');
const decompress = require('decompress');
const fs = require("fs");
const path = require("path");

/**
 * zip压缩包处理帮助类
 * @class
 */
class ZipHelper {

  /**
   * 解压模块zip包
   * @param {string} source zip存放的路径
   * @param {string} target zip包解压后存放的路径
   * @return {boolean} 解压成功返回true，解压失败返回false
   */
  static deCompress(source, target) {
    return new Promise(function (resolve, reject) {
      decompress(source, target).then(function (data) {
        console.log(data);
        resolve(true);
      }).catch(function (error) {
        reject(error);
      });
    });
  }
  /**
   * 压缩文件成zip
   * @param {any} sourceDir 要压缩哪个目录的文件或者要压缩的文件数组
   * @param {string} target 文件压缩以后存放到哪个目录
   * @param {string} zipName 压缩包的名称 
   * @param {string} extensionName 压缩包的后缀名，默认为zip，可以为tar
   * @return {boolean} 压缩成功返回true，压缩失败返回false
   */
  static compress(sourceDir, target, zipName, extensionName = "zip") {
    let type = Object.prototype.toString.call(sourceDir);
    let output = fs.createWriteStream(path.normalize(`${target}/${zipName}.${extensionName}`));
    let archive = archiver(extensionName);
    return new Promise(function (resolve, reject) {
      archive.on('error', function (error) {
        reject(reject);
      });
      archive.pipe(output);
      switch (type) {
        case "[object String]":
          archive.directory(sourceDir, false);
          break;
        case "[object Array]":
          break;
        default:
          break;
      }
      output.on('end', function () {
        resolve(true);
      });
      output.on('close', function () {
        resolve(true);
      });
      archive.finalize();
    });
  }
}

module.exports = ZipHelper;