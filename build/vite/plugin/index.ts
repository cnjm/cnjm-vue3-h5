import type { PluginOption } from "vite";
import vue from "@vitejs/plugin-vue";
import { configViteMockServePlugin } from "./viteMockServe";
import { configHtmlPlugin } from "./html";
import { configUnocssPlugin } from "./unocss";
import { componentResolverPlugin } from "./componentResolver";
import { autoImportPlugin } from "./autoImport";
import { autoVconsolePlugin } from "./autoVconsole";
import { unpluginIcons } from "./unpluginIcons";

export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
  const { VITE_USE_MOCK } = viteEnv;

  const vitePlugins: (PluginOption | PluginOption[])[] = [
    vue(),
    componentResolverPlugin(),
    autoImportPlugin(),
    // use vueJsx
    // vueJsx(),
  ];

  // vite-plugin-html
  vitePlugins.push(configHtmlPlugin(viteEnv, isBuild));

  // unocss https://uno.antfu.me/
  vitePlugins.push(configUnocssPlugin());

  // svg icons
  vitePlugins.push(unpluginIcons());

  // console
  vitePlugins.push(autoVconsolePlugin(isBuild));

  // mock
  VITE_USE_MOCK && vitePlugins.push(configViteMockServePlugin(isBuild, VITE_USE_MOCK));

  return vitePlugins;
}
