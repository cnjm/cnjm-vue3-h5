import type { AppRouteModule } from "/@/router/types";

import { LAYOUT } from "/@/router/constant";

const home: AppRouteModule = {
  path: "/home",
  name: "Home",
  component: LAYOUT,
  redirect: "/home/index",
  meta: {
    title: "主页",
  },
  children: [
    {
      path: "index",
      name: "HomePage",
      component: () => import("/@/views/home/index.vue"),
      meta: {
        title: "主页",
        showTabbar: true,
      },
    },
  ],
};

export default home;
