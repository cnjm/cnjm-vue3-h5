import type { PluginOption } from "vite";
import vue from "@vitejs/plugin-vue";
// import vueSetupExtend from "vite-plugin-vue-setup-extend";
// import { configStyleImportPlugin } from "./styleImport";
import { configSvgIconsPlugin } from "./svgSprite";
import { configViteMockServePlugin } from "./viteMockServe";
import { configHtmlPlugin } from "./html";
import { configUnocssPlugin } from "./unocss";
import { componentResolverPlugin } from "./componentResolver";
import { autoImportPlugin } from "./autoImport";
import { autoVconsolePlugin } from "./autoVconsole";

export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
  const { VITE_USE_MOCK } = viteEnv;

  const vitePlugins: (PluginOption | PluginOption[])[] = [
    vue(),
    componentResolverPlugin(),
    autoImportPlugin(),
    // use vueJsx
    // vueJsx(),
    // https://www.npmjs.com/package/vite-plugin-vue-setup-extend
    // vueSetupExtend(),
  ];

  // vite-plugin-html
  vitePlugins.push(configHtmlPlugin(viteEnv, isBuild));

  // unocss https://uno.antfu.me/
  vitePlugins.push(configUnocssPlugin());

  // svg
  vitePlugins.push(configSvgIconsPlugin(isBuild));

  // console
  vitePlugins.push(autoVconsolePlugin(isBuild));

  // mock
  VITE_USE_MOCK && vitePlugins.push(configViteMockServePlugin(isBuild, VITE_USE_MOCK));

  return vitePlugins;
}
