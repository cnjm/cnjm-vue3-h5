import { viteMockServe } from "vite-plugin-mock";
// import { resolve } from "path";

export const configViteMockServePlugin = (isBuild: boolean, prodBuild: boolean) => {
  return viteMockServe({
    mockPath: "/mock",
    supportTs: true,
    localEnabled: !isBuild, // 是否应用于本地
    prodEnabled: isBuild && prodBuild, // 是否应用于生产-isBuild 并且生产环境配置了true
    //  这样可以控制关闭mock的时候不让mock打包到最终代码内  生产用的
    injectCode: `
      import { setupProdMockServer } from '/mock/index';
      setupProdMockServer();
    `,
  });
};
