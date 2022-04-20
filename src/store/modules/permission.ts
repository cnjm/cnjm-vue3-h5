import type { AppRouteRecordRaw } from "/@/router/types";
import { toRaw } from "vue";
import { defineStore } from "pinia";
import { store } from "/@/store";

import { asyncRoutes } from "/@/router/routes";
import { filter } from "/@/utils/helper/treeHelper";
import { RoleEnum } from "/@/enums/role.enum";
import { useUserStore } from "./user";

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
    async buildRoutesAction(): Promise<AppRouteRecordRaw[]> {
      const userStore = useUserStore();
      let routes: AppRouteRecordRaw[] = [];
      const roleList = toRaw(userStore.getRoleList) || [];
      console.log(roleList);
      const routeFilter = (route: AppRouteRecordRaw) => {
        const { meta } = route;
        const { roles } = meta || {};
        // 没有设置角色则默认通过
        if (!roles) return true;
        // 设置特定的角色（超级管理员）默认都可以访问
        if (roleList.includes(RoleEnum.SUPER)) return true;
        // 余下需要判断该用户是否包含所需角色
        return roleList.some((role) => roles.includes(role));
      };

      routes = filter(asyncRoutes, routeFilter);
      routes = routes.filter(routeFilter);
      console.log(routes);
      return routes;
    },
  },
});

export function usePermissionStoreWithOut() {
  return usePermissionStore(store);
}
