// 活动页、下载页等无需登录的路由配置
import { ERROR_LAYOUT } from "../constant";
import type { AppRouteModule } from "/@/router/types";

// http:ip:port/entrance
export const entranceRoutes: AppRouteModule[] = [
  {
    path: "/entrance",
    name: "Entrance",
    component: ERROR_LAYOUT,
    redirect: "/entrance/index",
    meta: {
      title: "入口",
      ignoreAuth: true,
    },
    children: [
      {
        path: "action",
        name: "EntranceAction",
        component: () => import("/@/views/entrance/action/index.vue"),
        meta: {
          title: "活动",
        },
      },
      {
        path: "download",
        name: "EntranceDownload",
        component: () => import("/@/views/entrance/download/index.vue"),
        meta: {
          title: "下载",
        },
      },
    ],
  },
];

export const entranceRouteNames = entranceRoutes.map((item) => item.name);
