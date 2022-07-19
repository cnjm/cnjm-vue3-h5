import type { App } from "vue";
import { debounceDirective } from "./debounce";

export function setupDirective(app: App<Element>) {
  console.log("app", app);
  app.use(debounceDirective);
  // app.directive(debounce.name, debounce.directive);
}

// 示例
// export const debounceDirective = {
//   install(app: App<Element>) {
//     app.directive("debounce", {
//       // 新增！在元素的 attribute 或事件监听器被应用之前调用
//       created(el: HTMLElement, binding: any, vnode: VueNode, prevVnode: VueNode) {
//         // console.log("Vue", Vue);
//         console.log(el, binding, vnode, prevVnode);
//       },
//       // 指令绑定到元素后调用。只调用一次
//       beforeMount() {},
//       // 元素插入父 DOM 后调用
//       mounted() {},
//       // 元素本身被更新之前调用 新增
//       beforeUpdate() {},
//       // 一旦组件和子级被更新，就会调用这个钩子
//       updated() {},
//       // 被卸载之前调用 新增
//       beforeUnmount() {},
//       // 一旦指令被移除，就会调用这个钩子
//       unmounted() {},
//     });
//   },
// };
