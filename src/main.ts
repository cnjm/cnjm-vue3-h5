// 自定义的全局css
import "/@/design/index.less";
import "uno.css";
import "virtual:unocss-devtools";

import { createApp } from "vue";
import App from "./App.vue";

// 自定义指令相关
import { setupDirective } from "/@/plugins/directive";
// 进度条控制
import "/@/plugins/nprogress";

// 路由相关
import { setupRouter } from "/@/router";

// pinia状态管理
import { setupStore } from "/@/store";

const bootstrap = async () => {
  const app = createApp(App);

  // pinia store
  setupStore(app);

  // router
  setupRouter(app);

  // 全局的自定义指令注册
  setupDirective(app);

  // other

  app.mount("#app");
};

bootstrap();
