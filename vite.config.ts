import type { ConfigEnv, UserConfig } from "vite";
import { loadEnv } from "vite";
import dayjs from "dayjs";
// import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import pkg from "./package.json";

import { wrapperEnv } from "./build/utils";
import { createProxy } from "./build/vite/proxy";
import { createVitePlugins } from "./build/vite/plugin/index";
import { generateModifyVars } from "./build/generate/generateModifyVars";

const pathResolve = (dir: string) => {
  return resolve(process.cwd(), ".", dir);
};

const { dependencies, devDependencies, name, version } = pkg;
const __APP_INFO__ = {
  pkg: { dependencies, devDependencies, name, version },
  lastBuildTime: dayjs().format("YYYY-MM-DD HH:mm:ss"),
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
    // css配置
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: generateModifyVars(),
          javascriptEnabled: true,
        },
      },
    },
    define: {
      __APP_INFO__: JSON.stringify(__APP_INFO__),
    },
  };
};
