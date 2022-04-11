import { defineStore } from "pinia";

interface PermissionState {
  count: number;
}

export const usePermissionStore = defineStore({
  id: "page",
  state: (): PermissionState => ({
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
