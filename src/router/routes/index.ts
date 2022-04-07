import type { AppRouteRecordRaw, AppRouteModule } from "/@/router/types";

import { PAGE_NOT_FOUND_ROUTE } from "/@/router/routes/basic";

import { entranceRoutes } from "./entrance";
import { PageEnum } from "/@/enums/page.enum";

const modules = import.meta.globEager("./modules/**/*.ts");

const routeModuleList: AppRouteModule[] = [];

Object.keys(modules).forEach((key) => {
  const mod = modules[key].default || {};
  const modList = Array.isArray(mod) ? [...mod] : [mod];
  routeModuleList.push(...modList);
});

export const asyncRoutes = [PAGE_NOT_FOUND_ROUTE, ...routeModuleList];

export const RootRoute: AppRouteRecordRaw = {
  path: "/",
  name: "Root",
  redirect: PageEnum.BASE_HOME,
  meta: {
    title: "Root",
  },
};

export const LoginRoute: AppRouteRecordRaw = {
  path: "/login",
  name: "Login",
  component: () => import("/@/views/sys/login/Login.vue"),
  meta: {
    title: "登录",
  },
};

// Basic routing without permission
export const basicRoutes = [LoginRoute, RootRoute, ...entranceRoutes, PAGE_NOT_FOUND_ROUTE];
