import "virtual:windi-devtools";
import "virtual:windi-base.css";
import "virtual:windi-components.css";
import "virtual:windi-utilities.css";
// windi end

// svg
import "virtual:svg-icons-register"; // 引入svg注册脚本

import { createApp } from "vue";
import App from "./App.vue";
import { setupVant } from "./plugins/vant";
import { setupDirective } from "./plugins/directive";
import { router, setupRouter } from "/@/router";
import { setupRouterGuard } from "./router/guard";
import { setupStore } from "./store";

const bootstrap = async () => {
  const app = createApp(App);

  // pinia store
  setupStore(app);

  // router
  setupRouter(app);

  // router guard
  setupRouterGuard(router);

  // vant 常用的全局组件注册
  setupVant(app);

  // 全局的自定义指令注册
  setupDirective(app);

  // other

  app.mount("#app");
};

bootstrap();
