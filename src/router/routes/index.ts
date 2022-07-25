import type { AppRouteRecordRaw, AppRouteModule } from "/@/router/types";
import { PAGE_NOT_FOUND_ROUTE, NETWORK_ERROR_ROUTE } from "./error";

import { entranceRoutes } from "./entrance";
import { PageEnum } from "/@/enums/page.enum";
import { LAYOUT } from "../constant";

// 这个路由配置列表
const routeModuleList: AppRouteModule[] = [];

// 配置信息文件
const modules = import.meta.globEager("./modules/**/*.ts");

// 特定文件夹下的index.vue 默认作为一个页面
const viewsFile = import.meta.globEager("/src/views/demo/**/index.vue");
const viewsFileAsync = import.meta.glob("/src/views/demo/**/index.vue");

// 无需配置路由配置文件，直接获取指定文件夹下的index文件，使用其导出的meat信息，组成路由配置
// 此处以demo文件夹下为例,并且不考虑继续嵌套，需要可自行实现
const routeList: AppRouteRecordRaw[] = [];
Object.keys(viewsFile).forEach((key) => {
  const itemPath = key.match(/\/src\/views(\S*)\/index\.vue/) || [];
  const mod = viewsFile[key].default || {};
  // 有meta信息并且匹配到路径
  if (mod.meta && itemPath.length) {
    const children = {
      path: itemPath[1],
      name: mod.name,
      component: viewsFileAsync[key],
      meta: mod.meta,
    };
    routeList.push(children);
  }
});
// 手动push
routeModuleList.push({
  path: "/demo",
  name: "Demo",
  component: LAYOUT,
  meta: {
    title: "示例",
  },
  children: routeList,
});

// 读取路由配置文件
Object.keys(modules).forEach((key) => {
  const mod = modules[key].default || {};
  const modList = Array.isArray(mod) ? [...mod] : [mod];
  routeModuleList.push(...modList);
});

export const asyncRoutes = routeModuleList;

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
export const basicRoutes = [RootRoute, ...entranceRoutes, NETWORK_ERROR_ROUTE, PAGE_NOT_FOUND_ROUTE];
