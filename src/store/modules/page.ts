import { defineStore } from "pinia";

import { PageEnum } from "/@/enums/page.enum";

interface Tabbar {
  path: string;
  normalImg: Object;
  activeImg: Object;
  title: string;
}
interface PageState {
  count: number;
  tabbar: Tabbar[];
}

export const usePageStore = defineStore({
  id: "page",
  state: (): PageState => ({
    count: 2,
    // 底部导航
    tabbar: [
      {
        path: PageEnum.HOME_PAGE,
        normalImg: () => import("/@/assets/tabbar/home_n.png"),
        activeImg: () => import("/@/assets/tabbar/home.png"),
        title: "主页",
      },
      {
        path: PageEnum.COMP_PAGE,
        normalImg: () => import("/@/assets/tabbar/comp_n.png"),
        activeImg: () => import("/@/assets/tabbar/comp.png"),
        title: "组件",
      },
      {
        path: PageEnum.ABOUT_PAGE,
        normalImg: () => import("/@/assets/tabbar/about_n.png"),
        activeImg: () => import("/@/assets/tabbar/about.png"),
        title: "关于",
      },
    ],
  }),
  getters: {
    getPageCount(): number {
      return this.count * 2;
    },
  },
  actions: {
    updatePageCount(count: number): void {
      this.count = count;
    },
    async updatePageCountAsync(count: number): Promise<void> {
      setTimeout(() => {
        this.count = count;
      }, 2000);
    },
  },
});
