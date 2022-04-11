import type { AppRouteRecordRaw, AppRouteModule } from "/@/router/types";

import { PAGE_NOT_FOUND_ROUTE, NETWORK_ERROR_ROUTE } from "./error";

import { entranceRoutes } from "./entrance";
import { PageEnum } from "/@/enums/page.enum";

const modules = import.meta.globEager("./modules/**/*.ts");

const routeModuleList: AppRouteModule[] = [];

Object.keys(modules).forEach((key) => {
  const mod = modules[key].default || {};
  const modList = Array.isArray(mod) ? [...mod] : [mod];
  routeModuleList.push(...modList);
});

export const asyncRoutes = [PAGE_NOT_FOUND_ROUTE, NETWORK_ERROR_ROUTE, ...routeModuleList];

export const RootRoute: AppRouteRecordRaw = {
  path: "/",
  name: "Root",
  redirect: PageEnum.BASE_HOME,
  meta: {
    title: "CNJM-H5",
  },
};

export const LoginRoute: AppRouteRecordRaw = {
  path: "/login",
  name: "Login",
  component: () => import("/@/views/login/index.vue"),
  meta: {
    title: "登录",
  },
};

// 基础路由（异常、无需token等页面）应为为白名单，不会鉴权
export const basicRoutes = [LoginRoute, RootRoute, ...entranceRoutes, PAGE_NOT_FOUND_ROUTE, NETWORK_ERROR_ROUTE];
