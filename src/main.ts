import "virtual:windi-devtools";
import "virtual:windi-base.css";
import "virtual:windi-components.css";
import "virtual:windi-utilities.css";
// windi end
import { createApp } from "vue";
import App from "./App.vue";
import { setupVant } from "./plugins/vant";
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

  // other

  app.mount("#app");
};

bootstrap();
