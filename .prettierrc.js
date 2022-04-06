/*
 * @Description: prettierrc配置文件
 * @Date: 2022-04-06 16:19:54
 * @Author: chenjiaming
 * @LastEditors: chenjiaming
 * @LastEditTime: 2022-04-06 16:19:55
 */
module.exports = {
  printWidth: 120, // 换行字符串阈值
  tabWidth: 2, // 设置工具每一个水平缩进的空格数
  useTabs: false,
  semi: true, // 句末是否加分号
  vueIndentScriptAndStyle: true,
  singleQuote: false, // 用双引号
  trailingComma: "all", // 最后一个对象元素加逗号
  bracketSpacing: true, // 对象，数组加空格
  jsxBracketSameLine: true, // jsx > 是否另起一行
  arrowParens: "always", // (x) => {} 是否要有小括号
  requirePragma: false, // 不需要写文件开头的 @prettier
  insertPragma: false, // 不需要自动在文件开头插入 @prettier
};
