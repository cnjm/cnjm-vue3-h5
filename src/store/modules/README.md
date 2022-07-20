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
