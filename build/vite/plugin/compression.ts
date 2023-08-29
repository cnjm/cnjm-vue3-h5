import viteCompression from "vite-plugin-compression";

export const compressionPlugin = (gzip) => {
  return viteCompression({
    disable: !gzip,
    threshold: 20 * 1024,
  });
};
