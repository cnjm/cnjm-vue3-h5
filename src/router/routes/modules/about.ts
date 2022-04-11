import type { AppRouteModule } from "/@/router/types";

import { LAYOUT } from "/@/router/constant";

const about: AppRouteModule = {
  path: "/about",
  name: "About",
  component: LAYOUT,
  redirect: "/about/index",
  meta: {
    title: "关于",
  },
  children: [
    {
      path: "index",
      name: "AboutPage",
      component: () => import("/@/views/about/index.vue"),
      meta: {
        title: "关于",
      },
    },
  ],
};

export default about;
