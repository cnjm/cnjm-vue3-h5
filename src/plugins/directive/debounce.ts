import { isFunction } from "/@/utils/internal/isType";
import type { App } from "vue";
type HTMLElementDeb = HTMLElement & { timer: null | NodeJS.Timeout; handler: (e: Event) => void };

export default (app: App<Element>) => {
  app.directive("debounce", {
    mounted(el: HTMLElementDeb, binding: any) {
      const modifiers = Object.keys(binding.modifiers);
      const delay = modifiers.length ? Number(modifiers[0]) : 500;
      const fun = binding.value;
      const event = binding.arg || "click";
      if (!isFunction(fun)) return;
      el.timer = null;
      el.handler = function (e: Event): void {
        if (el.timer) {
          clearTimeout(el.timer);
          el.timer = null;
        }
        el.timer = setTimeout(() => {
          fun(e);
          el.timer = null;
        }, delay);
      };
      el.addEventListener(event, el.handler);
    },
    beforeUnmount(el: HTMLElementDeb, binding: any) {
      const event = binding.arg || "click";
      if (el.timer) {
        clearTimeout(el.timer);
        el.timer = null;
      }
      el.removeEventListener(event, el.handler);
    },
  });
};
