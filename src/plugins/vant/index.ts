import { Button } from "vant";
import type { App } from "vue";
// 全局注册
const compList = [Button];

// 注册
export function setupVant(app: App<Element>) {
  compList.forEach((comp) => {
    app.use(comp);
  });
}
