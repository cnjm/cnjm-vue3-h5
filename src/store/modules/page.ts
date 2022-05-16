import { defineStore } from "pinia";

interface Tabbar {
  path: string;
  normalImg: string;
  activeImg: string;
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
        path: "/page/sales",
        normalImg: require("/@/assets/tabbar/home_n.png"),
        activeImg: require("/@/assets/tabbar/home.png"),
        title: "主页",
      },
      {
        path: "/page/sales",
        normalImg: require("/@/assets/tabbar/about_n.png"),
        activeImg: require("/@/assets/tabbar/about.png"),
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
