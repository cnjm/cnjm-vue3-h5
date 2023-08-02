import { defineStore } from "pinia";
import { usePageStoreWithOut } from "./page";
import { store } from "/@/store";

export const useDemoStore = defineStore({
  id: "demo",
  // 自动推断类型,也可自行进行类型标注
  state: () => ({
    count: 0,
    testObj: {
      title: "demo",
    },
    testArray: [1],
  }),
  getters: {
    // 可以这样写
    getDoubleCount: (state) => {
      return state.count * 2;
    },
    // 也可以这样写
    // getDoubleCount(state) {
    //   return state.count * 2;
    // },
    // 如果使用this 需要明确返回值类型
    // getDoubleCount(): number {
    //   return this.count * 2;
    // },
    // 当依赖当前store的其他的getters  此时用到this
    getDoubleCountPlusOne(): number {
      return this.getDoubleCount + 1;
    },
    // 使用其他store的getters时 *****应避免循环引用******
    otherGetter(state) {
      const pageStore = usePageStoreWithOut();
      return { test: pageStore.demoStoreTest, count: state.count };
    },
  },
  actions: {
    // count
    updateCount(count: number): void {
      this.count = count;
    },
    async asyncChangeCount(count: number): Promise<void> {
      try {
        return new Promise((resolve) => {
          setTimeout(() => {
            this.count = count;
            resolve();
          }, 2000);
        });
      } catch (error) {
        return Promise.reject(error);
      }
    },
  },
  // 持久化存储插件配置persist 默认使用的是 localStorage
  persist: {
    key: "demo",
    // storage可自定义见 https://prazdevs.github.io/pinia-plugin-persistedstate/zh/guide/config.html#storage
    // storage: localStorage,
    paths: [""],
  },
});

export function useDemoStoreWithOut() {
  return useDemoStore(store);
}
