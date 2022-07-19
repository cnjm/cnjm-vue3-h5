import { isArray } from "/@/utils/internal/isType";
import type { App } from "vue";

export default (app: App<Element>) => {
  app.directive("auth", {
    mounted(el: HTMLElement, binding: any) {
      const roles = binding.value;
      if (!isArray(roles)) return;
      console.log(el, roles);
      el.parentNode!.removeChild(el);
    },
  });
};
