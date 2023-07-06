import { pick } from "lodash-es";
import type {
  RouteLocationPathRaw,
  RouteLocationNamedRaw,
  RouteLocationRaw,
  Router,
  LocationQueryRaw,
} from "vue-router";
import type { AppRouteRecordRaw } from "/@/router/types";
import { usePageStoreWithOut } from "/@/store/modules/page";

export function routerMetaAsync({
  viewsFile,
  viewsFileAsync,
  reg = new RegExp(/\/src\/views(\S*)\/index\.vue/),
}): AppRouteRecordRaw[] {
  // 无需配置路由配置文件，直接获取指定文件夹下的index文件，使用其导出的meat信息，组成路由配置
  // 此处以demo文件夹下为例,并且不考虑继续嵌套，需要可自行实现
  const routeList: AppRouteRecordRaw[] = [];
  Object.keys(viewsFile).forEach((key) => {
    const itemPath = key.match(reg) || [];
    const mod = viewsFile[key].default || {};
    // 有meta信息并且匹配到路径
    if (mod.meta && itemPath.length) {
      const children = {
        path: itemPath[1],
        name: mod.meta?.name || mod.name,
        component: viewsFileAsync[key],
        meta: mod.meta,
      };
      routeList.push(children);
    }
  });
  return routeList;
}

function isRouteLocationPathRaw(to: RouteLocationRaw): to is RouteLocationPathRaw {
  return (to as RouteLocationPathRaw).path !== undefined;
}
function isRouteLocationNamedRaw(to: RouteLocationRaw): to is RouteLocationNamedRaw {
  return (to as RouteLocationNamedRaw).name !== undefined;
}

// 重新整合to
function getRouterTo(router: Router, to: RouteLocationRaw) {
  const pageStore = usePageStoreWithOut();
  const currentRouteQuery = router.currentRoute.value.query || {};
  const persistQuery = pick(currentRouteQuery, pageStore.persistQuery);
  let query: LocationQueryRaw | undefined = {};

  if (isRouteLocationPathRaw(to)) {
    query = to.query;
  } else if (isRouteLocationNamedRaw(to)) {
    query = to.query;
    if (to.name && to.params) {
      pageStore.updateRouterParams(to.name, to.params);
    }
    delete to.params;
  } else {
    to = { path: to, query: {} } as RouteLocationPathRaw;
  }
  to.query = { ...persistQuery, ...query };
  return to;
}

// 特殊处理router pageState.persistQuery 标明的参数字段每次跳转时，如果当前页面有，则一并带入
// params 参数的变化 https://github.com/vuejs/router/blob/main/packages/router/CHANGELOG.md#414-2022-08-22
export function overWriteRouter(router: Router) {
  const originalPush = router.push;
  const originalReplace = router.replace;

  router.push = async function overWritePush(to: RouteLocationRaw) {
    return originalPush.call(this, getRouterTo(router, to));
  };
  router.replace = async function overWritePush(to: RouteLocationRaw) {
    return originalReplace.call(this, getRouterTo(router, to));
  };
}
