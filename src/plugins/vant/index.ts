import { Tabbar, TabbarItem, Button } from "vant";
import type { App } from "vue";
// 全局注册
const compList = [Tabbar, TabbarItem, Button];

// 注册
export function setupVant(app: App<Element>) {
  for (let i = 0; i < compList.length; i++) {
    app.use(compList[i]);
  }
}
