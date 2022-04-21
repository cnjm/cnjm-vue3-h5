// 应用配置
export interface AppConfig {
  storagePrefix: string;
  defaultCacheTime: number;
}
// 项目配置
export interface ProjectConfig {
  openPageLoading: boolean;
}
// 网络配置
export interface HttpConfig {
  // code message result
  requestCodeName: string;
  requestMessageName: string;
  requestResultName: string;
}
