import type { AppRouteRecordRaw } from "/@/router/types";
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
        name: mod.name,
        component: viewsFileAsync[key],
        meta: mod.meta,
      };
      routeList.push(children);
    }
  });
  return routeList;
}
