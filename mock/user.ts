import { MockMethod } from "vite-plugin-mock";
export default [
  {
    url: "/api/user/login",
    method: "post",
    response: ({ query }) => {
      console.log(query);
      return {
        code: 20000,
        result: { token: "123add" },
        message: "登录成功",
      };
    },
  },
  {
    url: "base/mock/user/login",
    method: "post",
    response: ({ query }) => {
      console.log(query);
      return {
        code: 20000,
        result: { token: "123add" },
        message: "登录成功",
      };
    },
  },
] as MockMethod[];
