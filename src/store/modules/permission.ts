import type { AppRouteRecordRaw } from "/@/router/types";
import { toRaw } from "vue";
import { defineStore } from "pinia";

import { asyncRoutes } from "/@/router/routes";
import { filter } from "/@/utils/helper/treeHelper";

interface PermissionState {
  count: number;
}

export const usePermissionStore = defineStore({
  id: "permission",
  state: (): PermissionState => ({
    count: 2,
  }),
  getters: {
    getPageCount(): number {
      return this.count * 2;
    },
  },
  actions: {
    async buildRoutesAction(): Promise<AppRouteRecordRaw> {
      const userStore = useUserStore();
      let routes: AppRouteRecordRaw[] = [];
      const roleList = toRaw(userStore.getRoleList) || [];

      const routeFilter = (route: AppRouteRecordRaw) => {
        const { meta } = route;
        const { roles } = meta || {};
        if (!roles) return true;
        if (roleList.includes(RoleEnum.SUPER)) return true;
        return roleList.some((role) => roles.includes(role));
      };

      routes = filter(asyncRoutes, routeFilter);
      return routes;
    },
  },
});
