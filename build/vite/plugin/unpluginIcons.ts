import Icons from "unplugin-icons/vite";
import { FileSystemIconLoader } from "unplugin-icons/loaders";

export const unpluginIcons = () => {
  return Icons({
    compiler: "vue3",
    // 缩放比例
    scale: 1,
    // defaultClass: "w-1em h-1em",
    autoInstall: true,
    // https://github.com/antfu/unplugin-icons#custom-icons
    customCollections: {
      about: FileSystemIconLoader("src/assets/icons/about", (svg) => {
        return svg.replace(/^<svg /, '<svg fill="currentColor" ');
      }),
    },
  });
};
