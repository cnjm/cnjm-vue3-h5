import { defineConfig } from "vite-plugin-windicss";

export default defineConfig({
  attributify: {
    prefix: "w:",
  },
  alias: {},
  // 根据设计稿等项目需要自行定制
  // https://windicss.org/utilities/general/colors.html
  theme: {
    extend: {},
    colors: {
      // Configure your color palette here
      // 主题颜色 绿色
      primary: "#21a675",
      // 浅绿
      secondary: "#a2e2c6",
      // 白
      white: "#ffffff",
      // 危险
      danger: "#e3342f",
    },
    fontSize: {
      xs: "20px",
      sm: "24px",
      tiny: "28px",
      base: "32px",
      lg: "36px",
      xl: "40px",
    },
    width: {
      xs: "20px",
    },
  },
});
