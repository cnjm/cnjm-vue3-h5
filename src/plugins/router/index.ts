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
import { srcToUpperCase } from "/@/utils/helper/transform";
import { queryUrlParams } from "/@/utils/util";

// 无需配置路由配置文件，直接获取指定文件夹下的index文件，使用其导出的meat信息，组成路由配置
// 此处以demo文件夹下为例,并且不考虑继续嵌套，需要可自行实现
export function routerMetaAsync({ viewsFile, reg = new RegExp(/\/src\/views(\S*)\/index\.vue/) }): AppRouteRecordRaw[] {
  const routeList: AppRouteRecordRaw[] = [];

  Object.keys(viewsFile).forEach(async (key) => {
    const itemPath = key.match(reg) || [];
    const mod = viewsFile[key];

    // 有meta信息并且匹配到路径
    if (mod.meta && itemPath.length) {
      const children = {
        path: itemPath[1],
        name: mod.name || srcToUpperCase(itemPath[1]),
        component: viewsFile[key],
        meta: mod.meta,
      };
      routeList.push(children);
    }
  });
  return routeList;
}

/**覆盖router.push、router.replace 相关代码**/
function isRouteLocationPathRaw(to: RouteLocationRaw): to is RouteLocationPathRaw {
  return (to as RouteLocationPathRaw).path !== undefined;
}
function isRouteLocationNamedRaw(to: RouteLocationRaw): to is RouteLocationNamedRaw {
  return (to as RouteLocationNamedRaw).name !== undefined;
}

// 重新整合to 使得params挂到pageStore中，在跳转后的组件可以通过route获取，同时，如果通过 path 重新跳转到此页面，将被标记清空
function getRouterTo(router: Router, to: RouteLocationRaw) {
  const pageStore = usePageStoreWithOut();
  const currentRouteQuery = router.currentRoute.value.query || {};
  const persistQuery = pick(currentRouteQuery, pageStore.persistQuery);
  let query: LocationQueryRaw | undefined = {};

  if (isRouteLocationPathRaw(to)) {
    // markRouterPath一旦标记，历史路由中相同path的params同样会被清掉，
    pageStore.markRouterPath = to.path;
    query = to.query;
  } else if (isRouteLocationNamedRaw(to)) {
    query = to.query;
    if (to.name) {
      pageStore.updateRouterParams(to.name, to.params);
    }
    delete to.params;
  } else {
    const [path, q] = to.split("?");
    pageStore.markRouterPath = path;
    if (q) {
      query = queryUrlParams(q);
    }
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
