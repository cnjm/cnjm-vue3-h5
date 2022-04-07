export const wrapperEnv = (envConf: Recordable): ViteEnv => {
  const ret: any = {};

  for (const envName of Object.keys(envConf)) {
    let realName = envConf[envName].replace(/\\n/g, "\n");
    // 布尔类型
    realName = realName === "true" ? true : realName === "false" ? false : realName;
    // 端口号转为number类型
    if (envName === "VITE_PORT") {
      realName = Number(realName);
    }
    // 代理配置
    if (envName === "VITE_PROXY" && realName) {
      try {
        realName = JSON.parse(realName.replace(/'/g, '"'));
      } catch (error) {
        realName = "";
      }
    }
    ret[envName] = realName;
    if (typeof realName === "string") {
      process.env[envName] = realName;
    } else if (typeof realName === "object") {
      process.env[envName] = JSON.stringify(realName);
    }
  }
  return ret;
};
