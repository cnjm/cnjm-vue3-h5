import type { AppRouteRecordRaw } from "/@/router/types";
import { defineStore } from "pinia";
import { store } from "/@/store";

import { getAsyncRoutes } from "/@/router/routes";
import { filter } from "/@/utils/helper/treeHelper";
import { getAuthStatus } from "/@/hooks/web/useAuth";

interface PermissionState {
  isDynamicAddedRoute: boolean;
}

export const usePermissionStore = defineStore({
  id: "permission",
  state: (): PermissionState => ({
    isDynamicAddedRoute: false,
  }),
  getters: {
    getIsDynamicAddedRoute(): boolean {
      return this.isDynamicAddedRoute;
    },
  },
  actions: {
    setDynamicAddedRoute(value: boolean) {
      this.isDynamicAddedRoute = value;
    },
    // 此处筛选能访问的路由
    async buildRoutesAction(): Promise<AppRouteRecordRaw[]> {
      let routes: AppRouteRecordRaw[] = [];
      const routeFilter = (route: AppRouteRecordRaw) => {
        const { meta } = route;
        const { roles = [] } = meta || {};
        return getAuthStatus(roles);
      };

      routes = filter(getAsyncRoutes(), routeFilter);
      routes = routes.filter(routeFilter);
      console.log(routes);
      return routes;
    },
  },
});

export function usePermissionStoreWithOut() {
  return usePermissionStore(store);
}
