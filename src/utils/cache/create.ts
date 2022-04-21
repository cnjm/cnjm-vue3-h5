import { createStorage as create, CreateStorageParams } from "./storageCache";
import { enableStorageEncryption } from "/@/settings/encryptionSetting";
import appSetting from "/@/settings/appSetting";

export type Options = Partial<CreateStorageParams>;

const createOptions = (storage: Storage, options: Options = {}): Options => {
  return {
    // 调试模式不加密
    hasEncrypt: enableStorageEncryption,
    storage,
    // appSetting中配置共同的前缀
    prefixKey: appSetting.storagePrefix,
    ...options,
  };
};
export const WebStorage = create(createOptions(sessionStorage));

export const createStorage = (storage: Storage = sessionStorage, options: Options = {}) => {
  return create(createOptions(storage, options));
};

// SessionStorage
export const createSessionStorage = (options: Options = {}) => {
  return createStorage(sessionStorage, { ...options, timeout: appSetting.defaultCacheTime });
};

// LocalStorage
export const createLocalStorage = (options: Options = {}) => {
  return createStorage(localStorage, { ...options, timeout: appSetting.defaultCacheTime });
};

export default WebStorage;
