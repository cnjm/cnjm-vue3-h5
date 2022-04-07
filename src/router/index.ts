import type { RouteRecordRaw } from "vue-router";
import type { App } from "vue";

import { createRouter, createWebHashHistory } from "vue-router";
import { basicRoutes } from "./routes";

// app router
export const router = createRouter({
  history: createWebHashHistory(),
  routes: basicRoutes as unknown as RouteRecordRaw[],
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});
console.log("import.meta.env.VITE_PUBLIC_PATH", import.meta.env.VITE_PUBLIC_PATH);

// config router
export function setupRouter(app: App<Element>) {
  app.use(router);
}
