import { defineStore } from "pinia";

interface PageState {
  count: number;
}

export const usePageStore = defineStore({
  id: "page",
  state: (): PageState => ({
    count: 2,
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
