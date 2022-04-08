declare type Recordable<T = any> = Record<string, T>;

interface ImportMetaEnv extends ViteEnv {
  __: unknown;
}
declare interface ViteEnv {
  VITE_PORT: number; // 端口
  VITE_ROUTER_MODE: "history" | "hash"; // 路由模式
  VITE_PROXY: [string, string][]; // 本地代理配置
  VITE_USE_MOCK: boolean;
  VITE_USE_PWA: boolean;
  VITE_PUBLIC_PATH: string;
  VITE_GLOB_APP_TITLE: string;
  VITE_GLOB_APP_SHORT_NAME: string;
  VITE_USE_CDN: boolean;
  VITE_DROP_CONSOLE: boolean;
  VITE_BUILD_COMPRESS: "gzip" | "brotli" | "none";
  VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE: boolean;
  VITE_LEGACY: boolean;
  VITE_USE_IMAGEMIN: boolean;
  VITE_GENERATE_UI: string;
}
