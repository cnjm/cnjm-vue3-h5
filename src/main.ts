import { createApp } from "vue";
import App from "./App.vue";
import { setupRouter } from "./router";
import { setupStore } from "./store";

const bootstrap = async () => {
  const app = createApp(App);

  // pinia store
  setupStore(app);

  // router
  setupRouter(app);

  // other

  app.mount("#app");
};

bootstrap();
