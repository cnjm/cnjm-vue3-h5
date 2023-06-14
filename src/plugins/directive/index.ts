import type { App } from "vue";
import debounceDirective from "./debounce";
import throttleDirective from "./throttle";
import longTouch from "./longTouch";
import authDirective from "./auth";
import scrollDirective from "./scroll";

export function setupDirective(app: App<Element>) {
  debounceDirective(app);
  throttleDirective(app);
  longTouch(app);
  authDirective(app);
  scrollDirective(app);
}
