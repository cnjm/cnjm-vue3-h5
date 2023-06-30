import type { RouteRecordRaw } from "vue-router";
import type { App } from "vue";

import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";
// import { createRouter, createWebHashHistory, createWebHistory } from "vue-router/auto";
import { basicRoutes } from "./routes";
import { RouterModeEnum } from "/@/enums/router.enum";
import { overWriteRouter } from "../plugins/router";
// 路由守卫
import { setupRouterGuard } from "/@/router/guard";

// 决定路由模式
const getHistoryMode = (path: string) => {
  if (import.meta.env.VITE_ROUTER_MODE === RouterModeEnum.HISTORY) {
    return createWebHistory(path);
  }
  return createWebHashHistory(path);
};
// app router
export const router = createRouter({
  history: getHistoryMode(import.meta.env.VITE_PUBLIC_PATH),
  routes: basicRoutes as unknown as RouteRecordRaw[],
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

// use router
export function setupRouter(app: App<Element>) {
  app.use(router);
  // router guard
  setupRouterGuard(router);
  // over write
  overWriteRouter(router);
}
