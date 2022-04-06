import type { ConfigEnv, UserConfig } from "vite";
import { loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import { createVitePlugins } from "./build/vite/plugin/index";

// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfig => {
  // 是否构建
  const isBuild = command === "build";
  return {
    // 构建模式所需的特有配置
    plugins: createVitePlugins(viteEnv, isBuild),
  };
};
