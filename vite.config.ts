import type { ConfigEnv, UserConfig } from "vite";
import { loadEnv } from "vite";
import dayjs from "dayjs";
// import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import pkg from "./package.json";

import { OUTPUT_DIR } from "./build/constant";
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
  const { VITE_PORT, VITE_PROXY, VITE_PUBLIC_PATH } = viteEnv;

  // 是否构建
  const isBuild = command === "build";

  return {
    base: VITE_PUBLIC_PATH,
    root,
    server: {
      // 监听到本地IP
      host: true,
      port: VITE_PORT,
      // 本地开发的代理配置
      proxy: createProxy(VITE_PROXY),
    },
    build: {
      target: "es2015",
      outDir: OUTPUT_DIR,
      minify: "esbuild",
      // 启用/禁用 brotli 压缩大小报告。压缩大型输出文件可能会很慢，因此禁用该功能可能会提高大型项目的构建性能。
      // brotliSize: false,
      // chunk 大小警告的限制（以 kbs 为单位）。
      chunkSizeWarningLimit: 2000,
      rollupOptions: {
        output: {
          // 用于输出静态资源的命名，[ext]表示文件扩展名
          assetFileNames: "[ext]/[name].[hash].[ext]",
          // 用于命名代码拆分时创建的共享块的输出命名
          // chunkFileNames: "js/[name].[hash].js",
          // 拆分js到模块文件夹
          chunkFileNames: (chunkInfo) => {
            const facadeModuleId = chunkInfo.facadeModuleId ? chunkInfo.facadeModuleId.split("/") : [];
            const fileName = facadeModuleId[facadeModuleId.length - 2] || "[name]";
            return `js/${fileName}/[name].[hash].js`;
          },
        },
      },
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
