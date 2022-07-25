import { AppConfig } from "/#/setting";
const appConfig: AppConfig = {
  // 是否校验权限  路由权限以及自定义指令权限控制
  whetherToVerifyPermissions: false,
  // 本地存储前缀
  storagePrefix: "CNJM_",
  // 默认存储有效时长，单位：秒
  defaultCacheTime: 60 * 60 * 24 * 7,
};

export default appConfig;
