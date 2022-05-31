# cnjm-h5

基于 Vue3 + Typescript + Vite + vant

## 步骤

1. 安装依赖

```
npm run bootstrap
```

2. 启动

```
# 开发环境
npm run serve:dev
# 测试环境
serve:staging
```

3. 构建

```
npm run build
```

## 完成进度

- [x] husky & .eslintrc - 代码规范
- [x] windicss & .prettierrc & postcss-px-to-viewport & styleImport - 样式相关
- [x] vite-plugin-svg-icons 引入 svg - 辅助功能
- [x] mock - 数据模拟
- [x] store - 全局状态管理
- [x] axios - http 请求
- [x] router（路由权限 - 目前只支持校验 token）
- [x] 登入登出（后续加入微信联登）
- [x] 构建信息 - 关于页
- [x] tabbar
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

## 备忘录

1. postcss-px-to-viewport 未找到兼容多个设计稿尺寸的方法,因此稍加改造了该插件
   解决 vite 中使用 postcss-px-to-viewport 无法使用 vant 等多种设计尺寸问题|postcss-plugins
   [使用方法](https://blog.csdn.net/weixin_42998707/article/details/124150578)
