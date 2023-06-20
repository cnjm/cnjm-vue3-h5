import type { App } from "vue";
import { createPinia } from "pinia";
import piniaPersist from "/@/plugins/pinia/piniaPersist";

const store = createPinia();
store.use(piniaPersist);

export function setupStore(app: App<Element>) {
  app.use(store);
}

export { store };
