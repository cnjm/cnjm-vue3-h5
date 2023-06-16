// 自定义的全局css
import "/@/design/index.less";
import "virtual:svg-icons-register"; // 引入svg注册脚本
import "uno.css";
import "virtual:unocss-devtools";

import { createApp } from "vue";
import App from "./App.vue";

// 自定义指令相关
import { setupDirective } from "/@/plugins/directive";
// 进度条控制
import "/@/plugins/nprogress";

// 路由相关
import { router, setupRouter } from "/@/router";
// 路由守卫
import { setupRouterGuard } from "/@/router/guard";
// pinia状态管理
import { setupStore } from "/@/store";
// 高亮代码组件
import { setupHljsVue } from "/@/plugins/hljsVue";

const bootstrap = async () => {
  const app = createApp(App);

  // pinia store
  setupStore(app);

  // router
  setupRouter(app);

  // router guard
  setupRouterGuard(router);

  // 全局的自定义指令注册
  setupDirective(app);

  // 高亮代码组件
  setupHljsVue(app);

  // other

  app.mount("#app");
};

bootstrap();
