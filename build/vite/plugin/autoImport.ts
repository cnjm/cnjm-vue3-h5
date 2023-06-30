import AutoImport from "unplugin-auto-import/vite";
// import { VantResolver } from "unplugin-vue-components/resolvers";

export const autoImportPlugin = () => {
  return AutoImport({
    include: [
      /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
      /\.vue$/,
      /\.vue\?vue/, // .vue
      /\.md$/, // .md
    ],
    imports: [
      // presets
      "vue",
      "vue-router",
      "pinia",
      // custom
      {
        "/@/hooks/web/useMessage": ["useMessage"],
        // "@vueuse/core": [
        //   // named imports
        //   "useMouse", // import { useMouse } from '@vueuse/core',
        //   // alias
        //   ["useFetch", "useMyFetch"], // import { useFetch as useMyFetch } from '@vueuse/core',
        // ],
        // axios: [
        //   // default imports
        //   ["default", "axios"], // import { default as axios } from 'axios',
        // ],
        // "[package-name]": [
        //   "[import-names]",
        //   // alias
        //   ["[from]", "[alias]"],
        // ],
      },
      // example type import
      // {
      //   from: "vue-router",
      //   imports: ["RouteLocationRaw"],
      //   type: true,
      // },
    ],
    vueTemplate: true,
    eslintrc: {
      // enabled: true,
      globalsPropValue: true,
    },
    // Custom
    resolvers: [],
  });
};
