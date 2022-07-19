import type { App } from "vue";
import debounceDirective from "./debounce";
import throttleDirective from "./throttle";
import authDirective from "./auth";
import scrollDirective from "./scroll";

export function setupDirective(app: App<Element>) {
  debounceDirective(app);
  throttleDirective(app);
  authDirective(app);
  scrollDirective(app);
}

// 示例
// app.directive("debounce", {
//   // 新增！在元素的 attribute 或事件监听器被应用之前调用
//   created(el: HTMLElement, binding: any, vnode: VueNode, prevVnode: VueNode) {
//   },
//   // 指令绑定到元素后调用。只调用一次
//   beforeMount() {},
//   // 元素插入父 DOM 后调用
//   mounted() {},
//   // 元素本身被更新之前调用 新增
//   beforeUpdate() {},
//   // 一旦组件和子级被更新，就会调用这个钩子
//   updated() {},
//   // 被卸载之前调用 新增
//   beforeUnmount() {},
//   // 一旦指令被移除，就会调用这个钩子
//   unmounted() {},
// });
