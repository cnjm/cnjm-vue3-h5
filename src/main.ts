// 自定义的全局css
import "/@/design/index.less";
import "virtual:svg-icons-register"; // 引入svg注册脚本
import "uno.css";
import "virtual:unocss-devtools";
import { createApp } from "vue";
import App from "./App.vue";

// 引入vant UI组件库
import { setupVant } from "/@/plugins/vant";
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
