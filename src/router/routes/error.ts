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
      component: () => import("/@/layouts/error/exception/index.vue"),
      meta: {
        title: "页面出错啦！",
      },
    },
  ],
};

// 网络错误 or other
export const NETWORK_ERROR_ROUTE: AppRouteRecordRaw = {
  path: "/error",
  name: "PageError",
  component: ERROR_LAYOUT,
  meta: {
    title: "网络出错啦！",
  },
  children: [
    {
      path: "network",
      name: "NetworkError",
      component: () => import("/@/layouts/error/network/index.vue"),
      meta: {
        title: "网络出错啦！",
      },
    },
  ],
};
