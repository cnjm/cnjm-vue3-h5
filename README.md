# cnjm-h5

基于 Vue3.3 + Typescript + Vite + vant4 + pinia + vue-router + unoCss

如果对你有用，欢迎给个[star](https://github.com/cnjm/cnjm-vue3-h5)

如果有什么建议或想法，欢迎 issues 或 pr

## 在线预览

支持在线体验预览 [vue3-h5](https://cnjm.top/vue3-h5)

## 文档说明

配备详细文档说明 [vue3-h5-doc](https://cnjm.top/vue3-h5-doc)

## 步骤

1. 安装依赖

```shell
# pnpm install
pnpm run bootstrap
```

2. 启动

```shell
# 开发环境
pnpm run serve:dev
# 测试环境
serve:staging
```

3. 构建

```shell
pnpm run build
```

## 完成进度

- [x] husky & .eslintrc - 代码规范
- [x] unocss(使用样式预算、属性模式预设) & .prettierrc & postcss-px-to-viewport(多设计尺寸) - 样式相关
- [x] unplugin-icons 图标功能
- [x] unplugin-auto-import & unplugin-auto-vconsole 自动导入方法、组件（一些 vant 组件或者 vue3、pinia、router 等引入还是很方便的，但不可滥用）
- [x] mock - 请求数据模拟
- [x] pinia - store 全局状态管理 - 持久化等
- [x] axios - http 请求
- [x] router 路由权限等一系列基础用法
- [x] 简单的登入登出
- [x] tabbar
- [ ] hook (加载列表示例)
- [ ] 组件

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
