// highlight 的样式，依赖包，组件
import "highlight.js/styles/atom-one-dark.css";
import "highlight.js/lib/common";
import hljsVuePlugin from "@highlightjs/vue-plugin";
import { App } from "vue";

export const setupHljsVue = (app: App<Element>) => {
  app.use(hljsVuePlugin);
};
