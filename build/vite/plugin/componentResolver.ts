import { VantResolver } from "unplugin-vue-components/resolvers";
import IconsResolver from "unplugin-icons/resolver";
import Components from "unplugin-vue-components/vite";

export const componentResolverPlugin = () => {
  return Components({
    dirs: ["src/components/resolver"],
    // globs: ["src/components/resolver/*/index.{vue}"],
    // extensions: ["vue"],
    // exclude: [/[\\/]node_modules[\\/]/, /[\\/]\.git[\\/]/, /[\\/]\.nuxt[\\/]/, /[\\/]\.src[\\/]/],
    deep: true,
    // globalNamespaces: ["resolver"],
    // directoryAsNamespace: true,
    // collapseSamePrefixes: true,
    // dts: "types/components.d.ts",
    resolvers: [
      VantResolver(),
      IconsResolver({
        prefix: "Icon",
        alias: {
          spinners: "svg-spinners",
        },
        customCollections: ["about"],
      }),
    ],
  });
};
