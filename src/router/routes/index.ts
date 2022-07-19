import type { AppRouteRecordRaw, AppRouteModule } from "/@/router/types";
import { PAGE_NOT_FOUND_ROUTE, NETWORK_ERROR_ROUTE } from "./error";

import { entranceRoutes } from "./entrance";
import { PageEnum } from "/@/enums/page.enum";

const modules = import.meta.globEager("./modules/**/*.ts");

const viewsFile = import.meta.globEager("/src/views/demo/**/index.vue");

console.log(viewsFile);
// 无需配置路由配置文件，直接获取指定文件夹下的index文件，使用其导出的meat信息，组成路由配置
Object.keys(viewsFile).forEach((key) => {
  const routeList: AppRouteRecordRaw[] = [];
  const itemPath = key.match(/\/src\/views\/(\S*)\/index\.vue/) || [];
  const mod = viewsFile[key].default || {};
  if (mod.meta && itemPath.length) {
    const children = {
      path: itemPath[1],
      name: mod.name,
      component: viewsFile[key],
      meta: mod.meta,
    };
    routeList.push(children);
  }
  console.log(itemPath);
});

const routeModuleList: AppRouteModule[] = [];

// 读取路由配置文件
Object.keys(modules).forEach((key) => {
  const mod = modules[key].default || {};
  const modList = Array.isArray(mod) ? [...mod] : [mod];
  routeModuleList.push(...modList);
});

export const asyncRoutes = [PAGE_NOT_FOUND_ROUTE, NETWORK_ERROR_ROUTE, ...routeModuleList];

console.log(asyncRoutes);

// 根路径
export const RootRoute: AppRouteRecordRaw = {
  path: "/",
  name: "Root",
  redirect: PageEnum.BASE_HOME,
  meta: {
    title: "CNJM-H5",
  },
};

// 基础路由（异常、无需token等页面）应为为白名单，不会鉴权
export const basicRoutes = [RootRoute, ...entranceRoutes, PAGE_NOT_FOUND_ROUTE, NETWORK_ERROR_ROUTE];
