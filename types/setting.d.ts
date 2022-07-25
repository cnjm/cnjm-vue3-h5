// 应用配置
export interface AppConfig {
  whetherToVerifyPermissions: boolean;
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

export interface GlobConfig {
  // Site title
  title: string;
  // Service interface url
  apiUrl: string;
  // Upload url
  uploadUrl?: string;
  //  Service interface url prefix
  urlPrefix?: string;
  // Project abbreviation
  shortName: string;
}
export interface GlobEnvConfig {
  // Site title
  VITE_GLOB_APP_TITLE: string;
  // Service interface url
  VITE_GLOB_API_URL: string;
  // Service interface url prefix
  VITE_GLOB_API_URL_PREFIX?: string;
  // Project abbreviation
  VITE_GLOB_APP_SHORT_NAME: string;
  // Upload url
  VITE_GLOB_UPLOAD_URL?: string;
}
