import { viteMockServe } from "vite-plugin-mock";
import { resolve } from "path";

export const configViteMockServePlugin = () => {
  return viteMockServe({
    mockPath: resolve(process.cwd(), "mock"),
    supportTs: true,
    // localEnabled: !isBuild,
  });
};
