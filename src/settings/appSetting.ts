import { AppConfig } from "/#/setting";
const appConfig: AppConfig = {
  // 本地存储前缀
  storagePrefix: "CNJM_",
  // 默认存储有效时长，单位：秒
  defaultCacheTime: 60 * 60 * 24 * 7,
};

export default appConfig;
