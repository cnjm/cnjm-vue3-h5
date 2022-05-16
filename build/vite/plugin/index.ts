import type { Plugin } from "vite";
import vue from "@vitejs/plugin-vue";
import vueSetupExtend from "vite-plugin-vue-setup-extend";
import { configStyleImportPlugin } from "./styleImport";
import { configSvgIconsPlugin } from "./svgSprite";
import { configViteMockServePlugin } from "./viteMockServe";

export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
  console.log(viteEnv, isBuild);
  // const { VITE_USE_IMAGEMIN, VITE_USE_MOCK, VITE_LEGACY, VITE_BUILD_COMPRESS, VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE } =
  //   viteEnv;

  const vitePlugins: (Plugin | Plugin[])[] = [
    vue(),
    // use vueJsx
    // vueJsx(),
    // https://www.npmjs.com/package/vite-plugin-vue-setup-extend
    vueSetupExtend(),
  ];

  // svg
  vitePlugins.push(configSvgIconsPlugin(isBuild));

  // style import
  vitePlugins.push(configStyleImportPlugin());

  // mock
  vitePlugins.push(configViteMockServePlugin(isBuild));

  return vitePlugins;
}
