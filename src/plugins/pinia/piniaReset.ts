import { PiniaPluginContext } from "pinia";
import { pick } from "lodash-es";

declare module "pinia" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  export interface _StoreWithState<Id extends string, S extends StateTree, G, A> extends StoreProperties<Id> {
    // 选择自定义一个方法名，当然，你也可以覆盖$reset方法，这里只是不想破坏原有的东西，仅为示例
    $resetFields<K extends keyof S>(fields?: K[]): void;
  }
}

export default ({ options, store }: PiniaPluginContext): void => {
  store.$resetFields = (fields) => {
    const { state } = options;
    let originalState = state ? state() : {};
    store.$patch(($state) => {
      if (fields) {
        originalState = pick(originalState, fields);
      }
      Object.assign($state, originalState);
    });
  };
};
