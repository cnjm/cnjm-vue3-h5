import type {
  ComponentRenderProxy,
  VNode,
  VNodeChild,
  ComponentPublicInstance,
  FunctionalComponent,
  PropType as VuePropType,
} from "vue";
declare global {
  const __APP_INFO__: {
    pkg: {
      name: string;
      version: string;
      dependencies: Recordable<string>;
      devDependencies: Recordable<string>;
    };
    lastBuildTime: string;
  };

  declare type PropType<T> = VuePropType<T>;
  declare type VueNode = VNodeChild | JSX.Element;

  declare type Recordable<T = any> = Record<string, T>;

  interface ImportMetaEnv extends ViteEnv {
    __: unknown;
  }
  declare interface ViteEnv {
    VITE_PORT: number; // 端口
    VITE_ROUTER_MODE: "history" | "hash"; // 路由模式
    VITE_PROXY: [string, string][]; // 本地代理配置
    VITE_DROP_CONSOLE: boolean; // 删除日志
    VITE_USE_MOCK: boolean;
    VITE_USE_PWA: boolean;
    VITE_PUBLIC_PATH: string;
    VITE_GLOB_APP_TITLE: string;
    VITE_GLOB_APP_SHORT_NAME: string;
    VITE_USE_CDN: boolean;
    VITE_BUILD_COMPRESS: "gzip" | "brotli" | "none";
    VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE: boolean;
    VITE_LEGACY: boolean;
    VITE_USE_IMAGEMIN: boolean;
    VITE_GENERATE_UI: string;
  }

  namespace JSX {
    // tslint:disable no-empty-interface
    type Element = VNode;
    // tslint:disable no-empty-interface
    type ElementClass = ComponentRenderProxy;
    interface ElementAttributesProperty {
      $props: any;
    }
    interface IntrinsicElements {
      [elem: string]: any;
    }
    interface IntrinsicAttributes {
      [elem: string]: any;
    }
  }
}
declare module "vue" {
  export type JSXComponent<Props = any> = { new (): ComponentPublicInstance<Props> } | FunctionalComponent<Props>;
}
