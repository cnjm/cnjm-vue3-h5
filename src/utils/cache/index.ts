import { Persistent, BasicKeys } from "/@/utils/cache/persistent";
// localstorage get
export const getLocalCache = <T>(key: BasicKeys) => Persistent.getLocal(key) as T;

// localstorage set
export const setLocalCache = (key: BasicKeys, value) => Persistent.setLocal(key, value, true);

// localstorage remove
export const removeLocalCache = (key: BasicKeys) => Persistent.removeLocal(key, true);

// localstorage clear
export const clearLocalCache = (immediate = true) => Persistent.clearLocal(immediate);

// Sessionstorage get
export const getSessionCache = <T>(key: BasicKeys) => Persistent.getSession(key) as T;

// Sessionstorage set
export const setSessionCache = (key: BasicKeys, value) => Persistent.setSession(key, value, true);

// Sessionstorage remove
export const removeSessionCache = (key: BasicKeys) => Persistent.removeSession(key, true);

// Sessionstorage clear
export const clearSessionCache = (immediate = true) => Persistent.clearSession(immediate);
