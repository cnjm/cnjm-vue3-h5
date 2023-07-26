import { defineStore } from "pinia";
import { store } from "/@/store";
import { PageEnum } from "/@/enums/page.enum";
import { RouteParamsRaw } from "vue-router";

export interface Tabbar {
  name: string;
  path: string;
  normalImg: string;
  activeImg: string;
  title: string;
}

interface ObjectOf {
  [_: string | symbol]: RouteParamsRaw;
}
interface PageState {
  // 页面标题
  pageTitle: string;
  tabbar: Tabbar[];
  // 路由跳转时需要带上的字段，a=>b 只要a页面链接有就会带上
  persistQuery: string[];
  // 路由跳转时 params 参数的暂存，以此替代
  routerParams: ObjectOf;
}

export const usePageStore = defineStore({
  id: "page",
  state: (): PageState => ({
    pageTitle: "",
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
    persistQuery: ["enable_console"],
    routerParams: {},
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
    updateRouterParams(name: string | symbol, params: RouteParamsRaw): void {
      this.routerParams[name] = params;
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: "page",
        paths: ["routerParams"],
      },
    ],
  },
});

export function usePageStoreWithOut() {
  return usePageStore(store);
}
