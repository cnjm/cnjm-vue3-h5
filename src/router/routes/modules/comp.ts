import type { AppRouteModule } from "/@/router/types";

import { LAYOUT } from "/@/router/constant";

const comp: AppRouteModule = {
  path: "/comp",
  name: "Comp",
  component: LAYOUT,
  redirect: "/comp/index",
  meta: {
    title: "组件",
  },
  children: [
    {
      path: "index",
      name: "CompPage",
      component: () => import("/@/views/comp/index.vue"),
      meta: {
        title: "组件",
        showTabbar: true,
        keepAlive: true,
      },
    },
    {
      path: "toast",
      name: "CompToast",
      component: () => import("/@/views/comp/toast/index.vue"),
      meta: {
        title: "toast",
      },
    },
    {
      path: "message",
      name: "CompMessage",
      component: () => import("/@/views/comp/message/index.vue"),
      meta: {
        title: "message",
      },
    },
  ],
};

export default comp;
