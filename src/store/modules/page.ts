import { defineStore } from "pinia";

import { PageEnum } from "/@/enums/page.enum";

export interface Tabbar {
  name: string;
  path: string;
  normalImg: string;
  activeImg: string;
  title: string;
}
interface PageState {
  pageTitle: string;
  tabbar: Tabbar[];
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
        normalImg: "/src/assets/tabbar/home_n.png",
        activeImg: "/src/assets/tabbar/home.png",
        title: "主页",
      },
      {
        name: "comp",
        path: PageEnum.COMP_PAGE,
        normalImg: "/src/assets/tabbar/comp_n.png",
        activeImg: "/src/assets/tabbar/comp.png",
        title: "组件",
      },
      {
        name: "about",
        path: PageEnum.ABOUT_PAGE,
        normalImg: "/src/assets/tabbar/about_n.png",
        activeImg: "/src/assets/tabbar/about.png",
        title: "关于",
      },
    ],
  }),
  getters: {},
  actions: {
    // g更改标题
    updatePageTitle(title: string): void {
      this.pageTitle = title;
    },
  },
});
