import { isFunction } from "/@/utils/internal/isType";
import type { App } from "vue";
type HTMLElementDeb = HTMLElement & { timer: null | NodeJS.Timeout; handler: (e: Event) => void };
// 元素滚动到底部触发
export default (app: App<Element>) => {
  app.directive("scroll", {
    mounted(el: HTMLElementDeb, binding: any) {
      el.handler = binding.value;
      el.addEventListener("scroll", function (event) {
        if (!isFunction(binding.value)) return;
        const scrollHeight = this.scrollHeight;
        const scrollTop = this.scrollTop;
        const clientHeight = this.clientHeight;
        if (scrollHeight - scrollTop <= clientHeight) {
          binding.value(event);
        }
      });
    },
    beforeUnmount(el: HTMLElementDeb) {
      el.removeEventListener("scroll", el.handler);
    },
  });
};
