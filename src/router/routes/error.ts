import type { AppRouteRecordRaw } from "/@/router/types";
import { ERROR_LAYOUT } from "/@/router/constant";

// 路由页面404
export const PAGE_NOT_FOUND_ROUTE: AppRouteRecordRaw = {
  path: "/:path(.*)*",
  name: "PageNotFound",
  component: ERROR_LAYOUT,
  meta: {
    title: "页面出错啦！",
  },
  children: [
    {
      path: "/:path(.*)*",
      name: "PageNotFound",
      component: () => import("/@/views/error/exception/index.vue"),
      meta: {
        title: "页面出错啦！",
      },
    },
  ],
};

// 网络错误
export const NETWORK_ERROR_ROUTE: AppRouteRecordRaw = {
  path: "/error",
  name: "NetworkError",
  component: ERROR_LAYOUT,
  meta: {
    title: "网络出错啦！",
  },
  children: [
    {
      path: "network",
      name: "NetworkError",
      component: () => import("/@/views/error/network/index.vue"),
      meta: {
        title: "网络出错啦！",
      },
    },
  ],
};
