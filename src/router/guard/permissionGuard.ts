import type { RouteParams, Router, RouteRecordRaw } from "vue-router";
import { PageNotFoundName } from "/@/router/routes/error";
import { PageEnum } from "/@/enums/page.enum";
import { usePermissionStoreWithOut } from "/@/store/modules/permission";
import { useUserStoreWithOut } from "/@/store/modules/user";
import { usePageStoreWithOut } from "/@/store/modules/page";
import { startProgress, closeProgress } from "/@/plugins/nprogress";

const LOGIN_PATH = PageEnum.BASE_LOGIN;

const whitePathList: PageEnum[] = [LOGIN_PATH];

export function createPermissionGuard(router: Router) {
  const userStore = useUserStoreWithOut();
  const permissionStore = usePermissionStoreWithOut();
  const pageStore = usePageStoreWithOut();
  router.beforeEach(async (to, from, next) => {
    startProgress();
    const token = userStore.getToken;

    // 白名单直接进
    if (whitePathList.includes(to.path as PageEnum)) {
      // 如果是登录页并且有token
      if (to.path === LOGIN_PATH && token) {
        try {
          await userStore.afterLoginAction();
          next((to.query?.redirect as string) || "/");
          return;
        } catch {}
      }
      next();
      return;
    }

    // 如果找不到token
    if (!token) {
      // 去的页面如果不需要校验，则直接通行
      if (to.meta.ignoreAuth) {
        next();
        return;
      }

      // 重定向到登录，记下当前to.fullPath，以作登录后跳回
      const redirectData: { path: string; replace: boolean; query?: Recordable<string> } = {
        path: LOGIN_PATH,
        replace: true,
      };
      if (to.path) {
        redirectData.query = {
          ...redirectData.query,
          redirect: encodeURIComponent(to.fullPath),
        };
      }
      next(redirectData);
      return;
    }

    // 如果未获取过用户信息 刷新页面也会重新获取
    if (userStore.getLastUpdateTime === 0) {
      try {
        await userStore.getUserInfoAction();
      } catch (err) {
        next();
        return;
      }
    }

    // 已经添加过路由的
    if (permissionStore.getIsDynamicAddedRoute) {
      next();
      return;
    }

    // 动态添加相关路由
    const routes = await permissionStore.buildRoutesAction();
    routes.forEach((route) => {
      router.addRoute(route as unknown as RouteRecordRaw);
    });
    permissionStore.setDynamicAddedRoute(true);

    if (to.name === PageNotFoundName) {
      // 动态添加路由后，此处应当重定向到fullPath，否则会加载404页面内容
      next({ path: to.fullPath, replace: true, query: to.query });
      return;
    } else if (from.query.redirect) {
      const redirectPath = from.query.redirect as string;
      const redirect = decodeURIComponent(redirectPath);
      const nextData = to.path === redirect ? { ...to, replace: true } : { path: redirect };
      next(nextData);
      return;
    } else {
      next();
      return;
    }
  });

  router.afterEach((to) => {
    // 如果有挂在routerParams上的params则在to中返回
    if (to.name) {
      // 将标记清除updateRouterParams对应的params
      if (pageStore.markRouterPath && pageStore.markRouterPath === to.path) {
        pageStore.markRouterPath = undefined;
        pageStore.updateRouterParams(to.name, to.params);
      } else if (to.name && pageStore.routerParams[to.name]) {
        to.params = { ...(pageStore.routerParams[to.name] as RouteParams) };
      }
    }
    closeProgress();
  });
}
