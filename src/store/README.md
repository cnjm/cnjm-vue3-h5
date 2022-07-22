┌───modules 模块
├───├───page.ts 应用页面相关
├───├───permission.ts 权限相关
├───├───user.ts 用户相关
└───index.ts 全局状态管理器 pinia

## demo

```ts
interface DemoState {
  pageTitle: string;
  tabbar: Tabbar[];
}
export const usePageStore = defineStore({
  id: "demo",
  state: (): DemoState => ({
    pageTitle: "",
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
```
