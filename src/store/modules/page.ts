import { defineStore } from "pinia";
import { store } from "/@/store";
import { PageEnum } from "/@/enums/page.enum";
import { RouteParamsRaw } from "vue-router";
import { ConfigProviderTheme } from "vant";

export interface Tabbar {
  name: string;
  path: string;
  normalImg: string;
  activeImg: string;
  title: string;
}

interface ObjectOf {
  [_: string | symbol]: RouteParamsRaw | undefined;
}
interface PageState {
  // 页面标题
  pageTitle: string;
  // 页面主题
  pageTheme: ConfigProviderTheme;
  tabbar: Tabbar[];
  // 路由跳转时需要带上的字段，a=>b 只要a页面链接有就会带上
  persistQuery: string[];
  // 路由跳转时 params 参数的暂存，以此替代
  routerParams: ObjectOf;
  // 标记纯path router
  markRouterPath?: string;
}

export const usePageStore = defineStore({
  id: "page",
  state: (): PageState => ({
    pageTitle: "",
    pageTheme: "light",
    // 底部导航
    tabbar: [
      {
        name: "home",
        path: PageEnum.HOME_PAGE,
        normalImg: "tabbar/home_n.png",
        activeImg: "tabbar/home.png",
        title: "主页",
      },
      {
        name: "comp",
        path: PageEnum.COMP_PAGE,
        normalImg: "tabbar/comp_n.png",
        activeImg: "tabbar/comp.png",
        title: "组件",
      },
      {
        name: "about",
        path: PageEnum.ABOUT_PAGE,
        normalImg: "tabbar/about_n.png",
        activeImg: "tabbar/about.png",
        title: "关于",
      },
    ],
    persistQuery: ["enable_console", "test"],
    routerParams: {},
    markRouterPath: undefined,
  }),
  getters: {
    demoStoreTest(state) {
      return state.pageTitle;
    },
  },
  actions: {
    // 更改标题
    updatePageTitle(title: string): void {
      this.pageTitle = title;
    },
    // 更改主题
    updateTheme(theme: ConfigProviderTheme) {
      this.pageTheme = theme;
    },
    updateRouterParams(name: string | symbol, params?: RouteParamsRaw): void {
      this.routerParams[name] = params;
    },
  },
  persist: [
    {
      key: "page",
      paths: ["pageTheme", "routerParams"],
      storage: window.sessionStorage,
    },
  ],
});

export function usePageStoreWithOut() {
  return usePageStore(store);
}
