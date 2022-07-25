import { isArray } from "/@/utils/internal/isType";
import { App } from "vue";
import { getAuthStatus } from "/@/hooks/web/useAuth";

export default (app: App<Element>) => {
  app.directive("auth", {
    mounted(el: HTMLElement, binding: any) {
      const roles = binding.value;
      if (isArray(roles) && !getAuthStatus(roles)) {
        el.parentNode!.removeChild(el);
      }
    },
  });
};
