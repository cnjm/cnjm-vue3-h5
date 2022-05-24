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
      },
    },
  ],
};

export default comp;
