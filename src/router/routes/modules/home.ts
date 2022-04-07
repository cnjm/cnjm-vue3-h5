import type { AppRouteModule } from "/@/router/types";

import { LAYOUT } from "/@/router/constant";

const about: AppRouteModule = {
  path: "/home",
  name: "Home",
  component: LAYOUT,
  meta: {
    title: "主页",
  },
  children: [
    {
      path: "index",
      name: "AboutPage",
      component: () => import("/@/views/sys/about/index.vue"),
      meta: {
        title: "关于",
        icon: "simple-icons:about-dot-me",
        hideMenu: true,
      },
    },
  ],
};

export default about;
