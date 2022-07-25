import type { AppRouteRecordRaw } from "/@/router/types";
import { defineStore } from "pinia";
import { store } from "/@/store";

import { asyncRoutes } from "/@/router/routes";
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
    // routes action
    async buildRoutesAction(): Promise<AppRouteRecordRaw[]> {
      let routes: AppRouteRecordRaw[] = [];
      const routeFilter = (route: AppRouteRecordRaw) => {
        const { meta } = route;
        const { roles = [] } = meta || {};
        return getAuthStatus(roles);
      };

      routes = filter(asyncRoutes, routeFilter);
      routes = routes.filter(routeFilter);
      return routes;
    },
  },
});

export function usePermissionStoreWithOut() {
  return usePermissionStore(store);
}
