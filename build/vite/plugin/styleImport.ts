import { createStyleImportPlugin, VantResolve } from "vite-plugin-style-import";

export const configStyleImportPlugin = () => {
  return createStyleImportPlugin({
    resolves: [VantResolve()],
  });
};
