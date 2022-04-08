import type { ConfigEnv, UserConfig } from "vite";
import { loadEnv } from "vite";
// import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

import { wrapperEnv } from "./build/utils";
import { createProxy } from "./build/vite/proxy";
import { createVitePlugins } from "./build/vite/plugin/index";

const pathResolve = (dir: string) => {
  return resolve(process.cwd(), ".", dir);
};

// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfig => {
  const root = process.cwd();
  const env = loadEnv(mode, pathResolve("env"));
  const viteEnv = wrapperEnv(env);
  const { VITE_PORT, VITE_PROXY } = viteEnv;

  // 是否构建
  const isBuild = command === "build";

  return {
    root,
    server: {
      // 监听到本地IP
      host: true,
      port: VITE_PORT,
      // 本地开发的代理配置
      proxy: createProxy(VITE_PROXY),
    },
    resolve: {
      // 别名
      alias: [
        // /@/xxxx => src/xxxx
        {
          find: /\/@\//,
          replacement: pathResolve("src") + "/",
        },
        // /#/xxxx => types/xxxx
        {
          find: /\/#\//,
          replacement: pathResolve("types") + "/",
        },
      ],
    },
    // 构建模式所需的特有配置
    plugins: createVitePlugins(viteEnv, isBuild),
  };
};
