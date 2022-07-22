/*
 * @Author: zheng yong tao
 * @Date: 2022-03-16 21:27:07
 * @LastEditors: zheng yong tao
 * @LastEditTime: 2022-03-16 23:15:17
 * @Description:
 */

const fs = require("fs");
const path = require("path");

let basepath = "./src/"; //解析目录路径
let filterFile = ["node_modules", "\\..*"]; //过滤文件名，使用，隔开
let stopFloor = 10; //遍历层数
let generatePath = "./fileTree.txt"; //生成文件路径
let isFullPath = true; //是否输出完整路径

//获取入参
let args = process.argv.slice(2);
if (args[0] && (args[0] === "-h" || args[0] === "-help")) {
  console.log("node getFileTree.js [参数1] [参数2] [参数3] [参数4] [参数5]");
  console.log("参数说明");
  console.log("参数1：解析目录路径,默认为'../'");
  console.log("参数2：过滤文件名,使用','隔开,支持正则表达式,默认为'node_modules', '\\..*'");
  console.log("参数3：遍历文件最大层数,默认为10");
  console.log("参数4：生成文件路径,默认为'./fileTree.txt'");
  console.log("参数5：是否输出完整路径,默认为true");
  console.log("参数按顺序读取,不能省略,使用默认值需要输入' '占位,如下:");
  console.log("node getFileTree.js [参数1] ' ' [参数3] [参数4] [参数5]");
  process.exit();
}

if (args[0] && args[0] !== " ") {
  basepath = args[0]; //解析目录路径
}
if (args[1] && args[1] !== " ") {
  filterFile = args[1].split(","); //过滤文件名，使用，隔开
}
if (args[2] && args[2] !== " ") {
  stopFloor = args[2]; //遍历层数
}
if (args[3] && args[3] !== " ") {
  generatePath = args[3]; //生成文件路径
}
if (args[4] && args[4] === "f") {
  isFullPath = false; //是否输出完整路径
}

function getPartPath(dirPath) {
  let base = basepath.split(/\/|\\/g);
  dirPath = dirPath.split(/\/|\\/g);
  while (base.length && dirPath.length && base[0] === dirPath[0]) {
    base.shift();
    dirPath.shift();
  }
  return dirPath.join("/");
}

function isFilterPath(item) {
  for (let i = 0; i < filterFile.length; i++) {
    let reg = filterFile[i];
    if (item.match(reg) && item.match(reg)[0] === item) return true;
  }
  return false;
}

function processDir(dirPath, dirTree = [], floor = 1) {
  if (floor > stopFloor) return;
  let list = fs.readdirSync(dirPath);
  list = list.filter((item) => {
    return !isFilterPath(item);
  });
  list.forEach((itemPath) => {
    const fullPath = path.join(dirPath, itemPath);
    const fileStat = fs.statSync(fullPath);
    const isFile = fileStat.isFile();
    const dir = {
      name: isFullPath ? getPartPath(fullPath) : itemPath,
    };
    if (!isFile) {
      dir.children = processDir(fullPath, [], floor + 1);
    }
    dirTree.push(dir);
  });
  return dirTree;
}

console.log("获取中，请稍后……");
let dirTree = [];
dirTree = processDir(basepath, dirTree);
let fileTree = "";

function consoleTree(tree, floor = 1, str = "", adder = "───", isLast = false) {
  str += adder;
  for (let i = 0; i < tree.length; i++) {
    if (floor === 1 && i === 0) {
      fileTree += "\n" + "┌" + str + tree[i].name;
    } else if ((isLast || floor === 1) && i === tree.length - 1 && !tree[i].children) {
      fileTree += "\n" + "└" + str + tree[i].name;
    } else {
      fileTree += "\n" + "├" + str + tree[i].name;
    }
    if (tree[i].children)
      consoleTree(tree[i].children, floor + 1, str, adder, (isLast || floor === 1) && i === tree.length - 1);
  }
}
console.log("生成中，请稍后……");
function writeTree(filePath, content) {
  clearTxt(generatePath);
  fs.writeFileSync(filePath, `${content}`);
  console.log(content);
}
function clearTxt(filePath) {
  fileTree = "";
  fs.writeFileSync(filePath, "");
}
consoleTree(dirTree);
writeTree(generatePath, fileTree);
console.log("生成结束");
