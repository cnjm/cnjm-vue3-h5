// 为处理vite vant375尺寸 但自身项目750等其他尺寸配置问题有如下两个方案  优点缺点都很明显，具体怎么用，见人见智了
// 1.https://blog.csdn.net/weixin_42998707/article/details/124150578  修改postcss-px-to-viewport插件源码
// 2.https://github.com/vitejs/vite/issues/4653  多个配置,这将导致插件处理两次，文件最后注释处

const path = require("path");
module.exports = () => {
  return {
    plugins: {
      autoprefixer: {
        overrideBrowserslist: ["Android 4.1", "iOS 7.1", "Chrome > 31", "ff > 31", "ie >= 8"],
      },
      "cnjm-postcss-px-to-viewport": {
        unitToConvert: "px", // 要转化的单位
        viewportWidth: 750, // UI设计稿的宽度
        unitPrecision: 6, // 转换后的精度，即小数点位数
        propList: ["*"], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
        viewportUnit: "vw", // 指定需要转换成的视窗单位，默认vw
        fontViewportUnit: "vw", // 指定字体需要转换成的视窗单位，默认vw
        selectorBlackList: ["ignore"], // 指定不转换为视窗单位的类名，
        minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
        mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
        replace: true, // 是否转换后直接更换属性值
        exclude: [], // 设置忽略文件，用正则做目录名匹配
        landscape: false, // 是否处理横屏情况
        // 如果没有使用其他的尺寸来设计，下面这个方法可以不需要，比如vant是375的
        customFun: ({ file }) => {
          // 这个自定义的方法是针对处理vant组件下的设计稿为375问题
          const designWidth = path.join(file).includes(path.join("node_modules", "vant")) ? 375 : 750;
          return designWidth;
        },
      },
    },
  };
};
// const path = require("path");
// const px2viewport = require("postcss-px-to-viewport");
// const autoprefixer = require("autoprefixer");
// module.exports = () => {
//   return {
//     plugins: [
//       autoprefixer({
//         overrideBrowserslist: ["Android 4.1", "iOS 7.1", "Chrome > 31", "ff > 31", "ie >= 8"],
//       }),
//       px2viewport({
//         unitToConvert: "px", // 要转化的单位
//         viewportWidth: 375, // UI设计稿的宽度
//         unitPrecision: 6, // 转换后的精度，即小数点位数
//         propList: ["*"], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
//         viewportUnit: "vw", // 指定需要转换成的视窗单位，默认vw
//         fontViewportUnit: "vw", // 指定字体需要转换成的视窗单位，默认vw
//         selectorBlackList: ["ignore"], // 指定不转换为视窗单位的类名，
//         minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
//         mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
//         replace: true, // 是否转换后直接更换属性值
//         exclude: [/^(?!.*node_modules\/vant)/], // 设置忽略文件，用正则做目录名匹配
//         landscape: false, // 是否处理横屏情况
//       }),
//       px2viewport({
//         unitToConvert: "px", // 要转化的单位
//         viewportWidth: 750, // UI设计稿的宽度
//         unitPrecision: 6, // 转换后的精度，即小数点位数
//         propList: ["*"], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
//         viewportUnit: "vw", // 指定需要转换成的视窗单位，默认vw
//         fontViewportUnit: "vw", // 指定字体需要转换成的视窗单位，默认vw
//         selectorBlackList: ["ignore"], // 指定不转换为视窗单位的类名，
//         minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
//         mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
//         replace: true, // 是否转换后直接更换属性值
//         exclude: [/node_modules\/vant/i], // 设置忽略文件，用正则做目录名匹配
//         landscape: false, // 是否处理横屏情况
//       }),
//     ],
//   };
// };
