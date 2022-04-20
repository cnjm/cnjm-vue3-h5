import type { Router, RouteRecordRaw } from "vue-router";
import { usePermissionStoreWithOut } from "/@/store/modules/permission";

export function createPermissionGuard(router: Router) {
  const permissionStore = usePermissionStoreWithOut();
  router.beforeEach(async (to, from, next) => {
    console.log(to, from);

    if (permissionStore.getIsDynamicAddedRoute) {
      next();
      return;
    }

    const routes = await permissionStore.buildRoutesAction();
    console.log(routes);
    routes.forEach((route) => {
      router.addRoute(route as unknown as RouteRecordRaw);
    });

    permissionStore.setDynamicAddedRoute(true);

    // if (to.name === PAGE_NOT_FOUND_ROUTE.name) {
    //   // 动态添加路由后，此处应当重定向到fullPath，否则会加载404页面内容
    //   next({ path: to.fullPath, replace: true, query: to.query });
    // } else {
    //   const redirectPath = (from.query.redirect || to.path) as string;
    //   const redirect = decodeURIComponent(redirectPath);
    //   const nextData = to.path === redirect ? { ...to, replace: true } : { path: redirect };
    //   next(nextData);
    // }
    next();
  });
}
