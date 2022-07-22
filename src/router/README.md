┌───guard
├───├───index.ts
├───├───permissionGuard.ts 全局路由守卫
├───routes
├───├───modules 自行配置的路由配置项，只做 tabbar 的三个示例
├───├───├───about.ts
├───├───├───comp.ts
├───├───├───home.ts
├───├───entrance.ts 应用入口（登录、活动等）无需验证权限的页面
├───├───error.ts 错误页（404 等）
├───├───index.ts 路由配置最终生成，包括 demo 文件夹下自动生成配置的示例
├───constant.ts 一些常量导出
├───index.ts 创建路由
└───type.ts 类型
