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
    url: "/api/user/getUserInfo",
    method: "post",
    response: ({ query }) => {
      console.log(query);
      return {
        code: 20000,
        result: {
          userId: 1,
          userName: "微茫",
        },
        message: "登录成功",
      };
    },
  },
] as MockMethod[];
