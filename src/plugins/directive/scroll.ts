import { isFunction } from "/@/utils/internal/isType";
import type { App } from "vue";

// 元素滚动到底部触发
export default (app: App<Element>) => {
  app.directive("scroll", {
    mounted(el: HTMLElement, binding: any) {
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
  });
};
