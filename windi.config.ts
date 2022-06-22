import { defineConfig } from "vite-plugin-windicss";

// function range(size: number, startAt = 1) {
//   return Array.from(Array(size).keys()).map((i) => i + startAt);
// }

export default defineConfig({
  attributify: {
    prefix: "w:",
  },
  alias: {},
  safelist: [
    // range(48).map((i) => `w-${i}`), // w-1 to w-48
    // range(10).map((i) => `mt-${i}`), // mt-1 to mt-10
  ],
  // 根据设计稿等项目需要自行定制
  // https://windicss.org/utilities/general/colors.html
  theme: {
    extend: {},
    // 颜色
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
    // 背景颜色
    backgroundColor: (theme) => ({
      ...theme("colors"),
      // 往后加
    }),
    // 字号  尽管windi可以让你享受数字推断的好处，但仍可以自行定义
    fontSize: {
      xs: "20px",
      sm: "24px",
      tiny: "28px",
      base: "32px",
      lg: "36px",
      xl: "40px",
    },
    // 粗细
    fontWeight: {
      hairline: 100,
      "extra-light": 100,
      thin: 200,
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
      "extra-bold": 800,
      black: 900,
    },
    // 一般width也不用特定，可以用[x]px 来设置不同的宽
    // 高类似，auto fll screen
    width: {
      routine: "700px",
    },
    // padding margin 自定义
    padding: {
      sm: "8px",
      md: "16px",
      lg: "24px",
      xl: "48px",
    },
    paddingTop: {
      sm: "8px",
      md: "16px",
      lg: "24px",
      xl: "48px",
    },
    paddingRight: {
      sm: "8px",
      md: "16px",
      lg: "24px",
      xl: "48px",
    },
    paddingBottom: {
      sm: "8px",
      md: "16px",
      lg: "24px",
      xl: "48px",
    },
    paddingLeft: {
      sm: "8px",
      md: "16px",
      lg: "24px",
      xl: "48px",
    },
    margin: {
      auto: "0 auto 0",
      sm: "8px",
      md: "16px",
      lg: "24px",
      xl: "48px",
    },
    marginTop: {
      sm: "8px",
      md: "16px",
      lg: "24px",
      xl: "48px",
    },
    marginRight: {
      sm: "8px",
      md: "16px",
      lg: "24px",
      xl: "48px",
    },
    marginBottom: {
      sm: "8px",
      md: "16px",
      lg: "24px",
      xl: "48px",
    },
    marginLeft: {
      sm: "8px",
      md: "16px",
      lg: "24px",
      xl: "48px",
    },
  },
});
