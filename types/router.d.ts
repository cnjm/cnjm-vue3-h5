export {};

declare module "vue-router" {
  interface RouteMeta extends Record<string | number | symbol, unknown> {
    // 标题
    title: string;
    // 是否忽略权限
    ignoreAuth?: boolean;
    // 角色信息
    roles?: RoleEnum[];
    // 是否不缓存
    ignoreKeepAlive?: boolean;
    // 当前页面转换
    transitionName?: string;
  }
}
