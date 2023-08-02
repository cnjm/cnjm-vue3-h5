import type { App } from "vue";
import { createPinia } from "pinia";
import piniaPersist from "pinia-plugin-persistedstate";
import piniaReset from "/@/plugins/pinia/piniaReset";

const store = createPinia();
store.use(piniaPersist);
store.use(piniaReset);

export function setupStore(app: App<Element>) {
  app.use(store);
}

export { store };
