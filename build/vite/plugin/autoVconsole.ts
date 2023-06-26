import autoVconsole from "unplugin-auto-vconsole/vite";
export const autoVconsolePlugin = (isBuild) => {
  function vconsoleEnabled() {
    if (isBuild) {
      return true;
    } else {
      return false;
    }
  }
  return autoVconsole({
    isBuild,
    enabled: vconsoleEnabled(),
  });
};
