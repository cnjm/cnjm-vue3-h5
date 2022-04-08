import { createApp } from "vue";
import App from "./App.vue";
import { setupVant } from "./plugins/vant";
// import { setupRouter } from "./router";
import { setupStore } from "./store";

const bootstrap = async () => {
  const app = createApp(App);

  // pinia store
  setupStore(app);

  // router
  // setupRouter(app);

  // vant 常用的全局组件注册
  setupVant(app);

  // other

  app.mount("#app");
};

bootstrap();
