import viteCompression from "vite-plugin-compression";

export const compressionPlugin = (gzip: boolean) => {
  return viteCompression({
    disable: !gzip,
    threshold: 20 * 1024,
  });
};
