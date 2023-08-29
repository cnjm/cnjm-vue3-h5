import type { AppRouteRecordRaw, AppRouteModule } from "/@/router/types";
import { PAGE_NOT_FOUND_ROUTE, NETWORK_ERROR_ROUTE } from "./error";
import { useGlobSetting } from "/@/hooks/setting";
import { entranceRoutes } from "./entrance";
import { PageEnum } from "/@/enums/page.enum";
import { LAYOUT } from "../constant";
import { routerMetaAsync } from "/@/plugins/router";

const { title } = useGlobSetting();

export const getAsyncRoutes = () => {
  // 这个路由配置列表
  const routeModuleList: AppRouteModule[] = [];

  /****路由配置信息文件****/
  const modules: Record<string, any> = import.meta.glob("./modules/**/*.ts", { eager: true });
  Object.values(modules).forEach(async (value) => {
    const mod = value.default;
    const modList = Array.isArray(mod) ? [...mod] : [mod];
    routeModuleList.push(...modList);
  });
  /****路由配置信息文件****/

  /****动态生成约定式路由配置信息****/
  // 特定文件夹下的index.vue 默认作为一个页面
  // import.meta.glob只能传字符串，如果需要换别的文件夹下，只需要修改 demo 为对应文件夹名称就行
  const viewsFile = import.meta.glob("/src/views/demo/**/index.vue", { import: "default", eager: true });

  // 无需配置路由配置文件，直接获取指定文件夹下的index文件，使用其导出的meat信息，组成路由配置
  // 此处以demo文件夹下为例,并且不考虑继续嵌套，需要可自行实现
  const routeList: AppRouteRecordRaw[] = routerMetaAsync({ viewsFile });
  // 手动push 到/demo下
  routeModuleList.push({
    path: "/demo",
    name: "Demo",
    component: LAYOUT,
    meta: {
      title: "示例",
    },
    children: routeList,
  });
  return routeModuleList;
};

/****动态生成约定式路由配置信息****/

// 根路径
export const RootRoute: AppRouteRecordRaw = {
  path: "/",
  name: "Root",
  redirect: PageEnum.BASE_HOME,
  meta: {
    title,
  },
};

// 基础路由（异常、无需token等页面）应为为白名单，不会鉴权
export const basicRoutes = [RootRoute, ...entranceRoutes, NETWORK_ERROR_ROUTE, PAGE_NOT_FOUND_ROUTE];
