// 活动页、下载页等无需登录的路由配置
import type { AppRouteModule } from "/@/router/types";

// 此处为应用入口路由，无需校验权限，默认渲染
// http:ip:port/*
export const entranceRoutes: AppRouteModule[] = [
  {
    path: "/login",
    name: "Login",
    component: () => import("/@/views/entrance/login/index.vue"),
    meta: {
      // 页面标题
      title: "登录",
      // 忽略token校验
      ignoreAuth: true,
    },
  },
  {
    path: "/action",
    name: "Action",
    component: () => import("/@/views/entrance/action/index.vue"),
    meta: {
      title: "活动",
      ignoreAuth: true,
    },
  },
  {
    path: "/download",
    name: "Download",
    component: import("/@/views/entrance/download/index.vue"),
    meta: {
      title: "下载",
      ignoreAuth: true,
    },
  },
];

export const entranceRouteNames = entranceRoutes.map((item) => item.name);
