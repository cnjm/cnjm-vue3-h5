┌───directive 自定义的指令，可以在 main 中控制需要需要、或者 directive/index.ts 中控制启用哪些
├───nprogress 页面进度条,可以在 design/index.less 中修改样式或者在 settings/projectSetting.ts 中控制开关，也可以在 main 中直接干掉
└───vant unplugin-vue-components 自动按需引入

自定义指令示例

```ts
// 示例
app.directive("debounce", {
  // 新增！在元素的 attribute 或事件监听器被应用之前调用
  created(el: HTMLElement, binding: any, vnode: VueNode, prevVnode: VueNode) {},
  // 指令绑定到元素后调用。只调用一次
  beforeMount() {},
  // 元素插入父 DOM 后调用
  mounted() {},
  // 元素本身被更新之前调用 新增
  beforeUpdate() {},
  // 一旦组件和子级被更新，就会调用这个钩子
  updated() {},
  // 被卸载之前调用 新增
  beforeUnmount() {},
  // 一旦指令被移除，就会调用这个钩子
  unmounted() {},
});
```
