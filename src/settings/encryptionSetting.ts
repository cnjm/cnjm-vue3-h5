import { isDevMode } from "/@/utils/util/env";

// aes encryption key
export const cacheAesKey = {
  key: "_11111000001111@",
  iv: "@11111000001111_",
};

// storage是否加密 默认dev不加密
export const enableStorageEncryption = !isDevMode();
