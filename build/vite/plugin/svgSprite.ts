import createSvgIconsPlugin from "vite-plugin-svg-icons";
import { resolve } from "path";

export const configSvgIconsPlugin = (isBuild: boolean) => {
  return createSvgIconsPlugin({
    iconDirs: [resolve(process.cwd(), "src/assets/icons")],
    svgoOptions: isBuild,
    // default
    symbolId: "icon-[dir]-[name]",
  });
};
