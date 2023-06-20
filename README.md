# cnjm-h5

基于 Vue3.3 + Typescript + Vite + vant4

## 步骤

1. 安装依赖

```
pnpm run bootstrap
```

2. 启动

```
# 开发环境
pnpm run serve:dev
# 测试环境
serve:staging
```

3. 构建

```
pnpm run build
```

## 完成进度

- [x] husky & .eslintrc - 代码规范
- [x] unocss(使用样式预算、属性模式预设) & .prettierrc & postcss-px-to-viewport & styleImport - 样式相关
- [x] vite-plugin-svg-icons 引入 svg - 辅助功能
- [x] mock - 请求数据模拟
- [x] pinia - store 全局状态管理
- [x] axios - http 请求
- [x] router（路由权限 - 目前只支持校验 token）
- [x] 登入登出（后续加入微信联登）
- [x] 构建信息 - 关于页
- [x] tabbar
- [ ] 组件

## 项目说明

### axios 请求

src\utils\axios\index.ts 中通过 createAxios 得到 http 实例，可以通过不同配置创建

### 自动导入说明

1. 使用[unplugin-auto-import](https://github.com/antfu/unplugin-auto-import) 已经配置自动导入 vue、vue-router,更多自定义导入在 build\vite\plugin\autoImport.ts 可配置

2. 使用[unplugin-vue-components](https://github.com/antfu/unplugin-vue-components) 已经配置自动导入 vant,src\components\resolver 下的组件也会默认自动按需导入，目前只找到这种固定的文件结构的方式，具体要看这个[pr](https://github.com/antfu/unplugin-vue-components/pull/645)能不能过更多自定义导入在 build\vite\plugin\componentResolver.ts 可配置

### 请求 mock 的使用

axios 所有的请求默认路径带了/api 前缀，如有必要在配置文件中修改，mock 中也带有/api 前缀，需同步修改，在需要 mock 的接口的路径中加入/mock，即为请求 mock 数据

1. 例如期望请求/api/user/login

2. 在 src/api 文件夹中只需要填写/user/login 会正常请求

3. 而填写/mock/user/login，则会请求/api/mock/user/login 获取 mock 数据

### 自定义指令的实现

1. 按钮级别的权限指令 auth，权限拦截`hooks/web/useAuth`中同路由权限校验

2. 防抖指令 debounce，默认 500 毫秒，使用同 throttle，详见 src\plugins\directive\debounce.ts

3. 元素滚动到底部指令 scroll ，详见 src\plugins\directive\scroll.ts

4. 元素点击节流指令 throttle，默认 click 事件，200 毫秒，可以这样使用 v-throttle:click.500="fun" 详见 src\plugins\directive\throttle.ts

5. 双击指令 默认 600 毫秒，可以这样使用 v-longTouch:stop.500="fun" ，stop 可阻止 touchstart 默认事件 详见 src\plugins\directive\throttle.ts

### 关于权限

### 关于权限

## Git 贡献提交规范

- 这里遵循 [vue](https://github.com/vuejs/vue/blob/dev/.github/COMMIT_CONVENTION.md) 规范 ([Angular](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular))

  - `feat` 增加新功能
  - `fix` 修复问题/BUG
  - `style` 代码风格相关无影响运行结果的
  - `perf` 优化/性能提升
  - `refactor` 重构
  - `revert` 撤销修改
  - `test` 测试相关
  - `docs` 文档/注释
  - `chore` 依赖更新/脚手架配置修改等
  - `workflow` 工作流改进
  - `ci` 持续集成
  - `types` 类型定义文件更改
  - `wip` 开发中

## 备忘录

1. postcss-px-to-viewport 未找到兼容多个设计稿尺寸的方法,因此稍加改造了该插件
   解决 vite 中使用 postcss-px-to-viewport 无法使用 vant 等多种设计尺寸问题|postcss-plugins
   [使用方法](https://blog.csdn.net/weixin_42998707/article/details/124150578)
