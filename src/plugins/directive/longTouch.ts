import { isFunction } from "/@/utils/internal/isType";
import type { App } from "vue";
type HTMLElementDeb = HTMLElement & {
  timer: null | NodeJS.Timeout;
  handlerTouchStart: (e: Event) => void;
  handlerTouchEnd: (e: Event) => void;
  handlerTouchMove: (e: Event) => void;
};

export default (app: App<Element>) => {
  app.directive("longTouch", {
    mounted(el: HTMLElementDeb, binding: any) {
      const modifiers = Object.keys(binding.modifiers);
      const delay = modifiers.length ? Number(modifiers[0]) : 600;
      const fun = binding.value;
      if (!isFunction(fun)) return;
      el.timer = null;
      el.handlerTouchStart = function (e: Event): void {
        if (el.timer) {
          clearTimeout(el.timer);
          el.timer = null;
        }
        el.timer = setTimeout(() => {
          fun(e);
          el.timer = null;
        }, delay);
      };
      el.handlerTouchMove = function (): void {
        if (el.timer) {
          clearTimeout(el.timer);
          el.timer = null;
        }
      };
      el.handlerTouchEnd = function (): void {
        if (el.timer) {
          clearTimeout(el.timer);
          el.timer = null;
        }
      };
      el.addEventListener("touchstart", el.handlerTouchStart);
      el.addEventListener("touchmove", el.handlerTouchMove);
      el.addEventListener("touchend", el.handlerTouchEnd);
    },
    beforeUnmount(el: HTMLElementDeb) {
      if (el.timer) {
        clearTimeout(el.timer);
        el.timer = null;
      }
      el.removeEventListener("touchstart", el.handlerTouchStart);
      el.removeEventListener("touchmove", el.handlerTouchMove);
      el.removeEventListener("touchend", el.handlerTouchEnd);
    },
  });
};
